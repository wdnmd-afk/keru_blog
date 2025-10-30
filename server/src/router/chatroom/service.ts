import { inject, injectable } from 'inversify'
import { PrismaDB } from '@/db'
import { ChatRoomListQueryDto, ChatRoomResponseDto, ChatRoomStatus, CreateChatRoomDto, ChatMessageDto } from './dto'
import { Prisma, ChatRoomStatus as PrismaChatRoomStatus } from '@prisma/client'

// 生成随机房间号（6位数字，避免以0开头）
function generateRoomNo(): string {
  const num = Math.floor(100000 + Math.random() * 900000)
  return String(num)
}

@injectable()
export class ChatRoomService {
  constructor(@inject(PrismaDB) private readonly db: PrismaDB) {}

  // 创建聊天室（限制每个用户仅能有一个进行中的房间）
  async create(data: CreateChatRoomDto, ownerId: string): Promise<ChatRoomResponseDto> {
    // 校验：是否已有进行中的房间
    const exists = await this.db.prisma.chatRoom.findFirst({
      where: { ownerId, status: PrismaChatRoomStatus.ACTIVE },
    })
    if (exists) {
      throw new Error('您已有一个进行中的聊天室，请先关闭后再创建')
    }

    // 生成唯一房间号
    let roomNo = generateRoomNo()
    // 冲突重试最多3次
    for (let i = 0; i < 3; i++) {
      const dup = await this.db.prisma.chatRoom.findUnique({ where: { roomNo } })
      if (!dup) break
      roomNo = generateRoomNo()
    }

    // 创建聊天室
    const room = await this.db.prisma.chatRoom.create({
      data: {
        roomNo,
        name: data.name,
        coverUrl: data.coverUrl,
        ownerId,
        status: PrismaChatRoomStatus.ACTIVE,
        startTime: new Date(),
      },
    })

    // 创建者自动加入房间
    await this.db.prisma.chatParticipant.create({
      data: { roomId: room.id, userId: ownerId, joinAt: new Date() },
    })

    const owner = await this.db.prisma.user.findUnique({ where: { id: ownerId } })
    const count = await this.db.prisma.chatParticipant.count({
      where: { roomId: room.id, leaveAt: null },
    })

    return {
      id: room.id,
      roomNo: room.roomNo,
      name: room.name,
      coverUrl: room.coverUrl ?? undefined,
      ownerId: room.ownerId,
      ownerName: owner?.name ?? null,
      status: ChatRoomStatus.ACTIVE,
      createdAt: room.createdAt,
      startTime: room.startTime,
      endTime: room.endTime ?? undefined,
      currentParticipants: count,
    }
  }

  // 房间列表分页
  async list(query: ChatRoomListQueryDto): Promise<{ items: ChatRoomResponseDto[]; total: number; page: number; limit: number }> {
    const page = Number(query.page || 1)
    const limit = Number(query.limit || 10)

    const where: Prisma.ChatRoomWhereInput = {}
    if (query.status) where.status = query.status as any

    const [rooms, total] = await this.db.prisma.$transaction([
      this.db.prisma.chatRoom.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.db.prisma.chatRoom.count({ where }),
    ])

    // 统计每个房间当前在线人数（leaveAt 为空）
    const items: ChatRoomResponseDto[] = []
    for (const r of rooms) {
      const [owner, count] = await Promise.all([
        this.db.prisma.user.findUnique({ where: { id: r.ownerId } }),
        this.db.prisma.chatParticipant.count({ where: { roomId: r.id, leaveAt: null } }),
      ])
      items.push({
        id: r.id,
        roomNo: r.roomNo,
        name: r.name,
        coverUrl: r.coverUrl ?? undefined,
        ownerId: r.ownerId,
        ownerName: owner?.name ?? null,
        status: r.status as any,
        createdAt: r.createdAt,
        startTime: r.startTime,
        endTime: r.endTime ?? undefined,
        currentParticipants: count,
      })
    }

    return { items, total, page, limit }
  }

  // 房间详情
  async detail(roomId: string): Promise<ChatRoomResponseDto | null> {
    const room = await this.db.prisma.chatRoom.findUnique({ where: { id: roomId } })
    if (!room) return null
    const [owner, count] = await Promise.all([
      this.db.prisma.user.findUnique({ where: { id: room.ownerId } }),
      this.db.prisma.chatParticipant.count({ where: { roomId: room.id, leaveAt: null } }),
    ])
    return {
      id: room.id,
      roomNo: room.roomNo,
      name: room.name,
      coverUrl: room.coverUrl ?? undefined,
      ownerId: room.ownerId,
      ownerName: owner?.name ?? null,
      status: room.status as any,
      createdAt: room.createdAt,
      startTime: room.startTime,
      endTime: room.endTime ?? undefined,
      currentParticipants: count,
    }
  }

  // 加入房间
  async join(roomId: string, userId: string): Promise<void> {
    const room = await this.db.prisma.chatRoom.findUnique({ where: { id: roomId } })
    if (!room) throw new Error('房间不存在')
    if (room.status !== PrismaChatRoomStatus.ACTIVE) throw new Error('房间已关闭')

    const active = await this.db.prisma.chatParticipant.findFirst({ where: { roomId, userId, leaveAt: null } })
    if (active) return

    // 若存在历史记录，允许再次加入新记录
    await this.db.prisma.chatParticipant.create({ data: { roomId, userId, joinAt: new Date() } })
  }

  // 离开房间
  async leave(roomId: string, userId: string): Promise<void> {
    await this.db.prisma.chatParticipant.updateMany({
      where: { roomId, userId, leaveAt: null },
      data: { leaveAt: new Date() },
    })
  }

  // 关闭房间（仅房主）
  async close(roomId: string, ownerId: string): Promise<void> {
    const room = await this.db.prisma.chatRoom.findUnique({ where: { id: roomId } })
    if (!room) throw new Error('房间不存在')
    if (room.ownerId !== ownerId) throw new Error('只有房间拥有者可以关闭房间')

    await this.db.prisma.$transaction([
      this.db.prisma.chatRoom.update({ where: { id: roomId }, data: { status: PrismaChatRoomStatus.ENDED, endTime: new Date() } }),
      this.db.prisma.chatParticipant.updateMany({ where: { roomId, leaveAt: null }, data: { leaveAt: new Date() } }),
    ])
  }

  // 我的房间（ownerOnly: 仅我创建的；否则包含我参与过的房间）
  async mine(userId: string, ownerOnly = true): Promise<ChatRoomResponseDto[]> {
    if (ownerOnly) {
      const rooms = await this.db.prisma.chatRoom.findMany({ where: { ownerId: userId }, orderBy: { createdAt: 'desc' } })
      const items: ChatRoomResponseDto[] = []
      for (const r of rooms) {
        const count = await this.db.prisma.chatParticipant.count({ where: { roomId: r.id, leaveAt: null } })
        items.push({
          id: r.id,
          roomNo: r.roomNo,
          name: r.name,
          coverUrl: r.coverUrl ?? undefined,
          ownerId: r.ownerId,
          ownerName: null,
          status: r.status as any,
          createdAt: r.createdAt,
          startTime: r.startTime,
          endTime: r.endTime ?? undefined,
          currentParticipants: count,
        })
      }
      return items
    }
    // 参与过的房间（含创建）
    const participations = await this.db.prisma.chatParticipant.findMany({
      where: { userId },
      distinct: ['roomId'],
      orderBy: { joinAt: 'desc' },
    })
    const items: ChatRoomResponseDto[] = []
    for (const p of participations) {
      const r = await this.db.prisma.chatRoom.findUnique({ where: { id: p.roomId } })
      if (!r) continue
      const count = await this.db.prisma.chatParticipant.count({ where: { roomId: r.id, leaveAt: null } })
      items.push({
        id: r.id,
        roomNo: r.roomNo,
        name: r.name,
        coverUrl: r.coverUrl ?? undefined,
        ownerId: r.ownerId,
        ownerName: null,
        status: r.status as any,
        createdAt: r.createdAt,
        startTime: r.startTime,
        endTime: r.endTime ?? undefined,
        currentParticipants: count,
      })
    }
    return items
  }

  // 拉取最近的聊天消息（默认30条，按时间升序返回）
  async getMessages(roomId: string, limit = 30): Promise<ChatMessageDto[]> {
    // 校验房间是否存在
    const room = await this.db.prisma.chatRoom.findUnique({ where: { id: roomId } })
    if (!room) throw new Error('房间不存在')

    const list = await this.db.prisma.chatMessage.findMany({
      where: { roomId },
      orderBy: { createdAt: 'desc' },
      take: Number(limit) || 30,
    })

    // 关联查询用户名
    const result: ChatMessageDto[] = []
    for (const m of list.reverse()) {
      const user = await this.db.prisma.user.findUnique({ where: { id: m.userId } })
      result.push({
        id: m.id,
        roomId: m.roomId,
        userId: m.userId,
        userName: user?.name ?? null,
        content: m.content,
        createdAt: m.createdAt,
      })
    }
    return result
  }

  // 发送消息（持久化）
  async sendMessage(roomId: string, userId: string, content: string): Promise<ChatMessageDto> {
    const room = await this.db.prisma.chatRoom.findUnique({ where: { id: roomId } })
    if (!room) throw new Error('房间不存在')
    if (room.status !== PrismaChatRoomStatus.ACTIVE) throw new Error('房间已关闭')

    const created = await this.db.prisma.chatMessage.create({
      data: { roomId, userId, content },
    })

    const user = await this.db.prisma.user.findUnique({ where: { id: userId } })
    return {
      id: created.id,
      roomId: created.roomId,
      userId: created.userId,
      userName: user?.name ?? null,
      content: created.content,
      createdAt: created.createdAt,
    }
  }
}
