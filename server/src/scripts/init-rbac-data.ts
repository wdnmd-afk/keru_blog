import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

// 初始权限数据
const initialPermissions = [
  // 仪表板权限
  {
    id: uuidv4(),
    name: '仪表板查看',
    code: 'dashboard:view',
    type: 'PAGE',
    description: '查看仪表板页面',
    parentId: null,
  },

  // 用户管理权限
  {
    id: uuidv4(),
    name: '用户管理',
    code: 'user:manage',
    type: 'PAGE',
    description: '用户管理模块',
    parentId: null,
  },
  {
    id: uuidv4(),
    name: '用户列表查看',
    code: 'user:view',
    type: 'PAGE',
    description: '查看用户列表',
    parentId: null, // 将在创建后设置
  },
  {
    id: uuidv4(),
    name: '用户创建',
    code: 'user:create',
    type: 'BUTTON',
    description: '创建新用户',
    parentId: null, // 将在创建后设置
  },
  {
    id: uuidv4(),
    name: '用户编辑',
    code: 'user:edit',
    type: 'BUTTON',
    description: '编辑用户信息',
    parentId: null, // 将在创建后设置
  },
  {
    id: uuidv4(),
    name: '用户删除',
    code: 'user:delete',
    type: 'BUTTON',
    description: '删除用户',
    parentId: null, // 将在创建后设置
  },

  // 角色管理权限
  {
    id: uuidv4(),
    name: '角色管理',
    code: 'role:manage',
    type: 'PAGE',
    description: '角色管理模块',
    parentId: null,
  },
  {
    id: uuidv4(),
    name: '角色列表查看',
    code: 'role:view',
    type: 'PAGE',
    description: '查看角色列表',
    parentId: null, // 将在创建后设置
  },
  {
    id: uuidv4(),
    name: '角色创建',
    code: 'role:create',
    type: 'BUTTON',
    description: '创建新角色',
    parentId: null, // 将在创建后设置
  },
  {
    id: uuidv4(),
    name: '角色编辑',
    code: 'role:edit',
    type: 'BUTTON',
    description: '编辑角色信息',
    parentId: null, // 将在创建后设置
  },
  {
    id: uuidv4(),
    name: '角色删除',
    code: 'role:delete',
    type: 'BUTTON',
    description: '删除角色',
    parentId: null, // 将在创建后设置
  },
  {
    id: uuidv4(),
    name: '角色权限分配',
    code: 'role:assign-permissions',
    type: 'BUTTON',
    description: '为角色分配权限',
    parentId: null, // 将在创建后设置
  },

  // 权限管理权限
  {
    id: uuidv4(),
    name: '权限管理',
    code: 'permission:manage',
    type: 'PAGE',
    description: '权限管理模块',
    parentId: null,
  },
  {
    id: uuidv4(),
    name: '权限列表查看',
    code: 'permission:view',
    type: 'PAGE',
    description: '查看权限列表',
    parentId: null, // 将在创建后设置
  },
  {
    id: uuidv4(),
    name: '权限创建',
    code: 'permission:create',
    type: 'BUTTON',
    description: '创建新权限',
    parentId: null, // 将在创建后设置
  },
  {
    id: uuidv4(),
    name: '权限编辑',
    code: 'permission:edit',
    type: 'BUTTON',
    description: '编辑权限信息',
    parentId: null, // 将在创建后设置
  },
  {
    id: uuidv4(),
    name: '权限删除',
    code: 'permission:delete',
    type: 'BUTTON',
    description: '删除权限',
    parentId: null, // 将在创建后设置
  },

  // 前端配置权限
  {
    id: uuidv4(),
    name: '前端配置',
    code: 'frontend-config:manage',
    type: 'PAGE',
    description: '前端配置管理',
    parentId: null,
  },
  {
    id: uuidv4(),
    name: '主题设置',
    code: 'frontend-config:theme',
    type: 'PAGE',
    description: '主题设置页面',
    parentId: null, // 将在创建后设置
  },
  {
    id: uuidv4(),
    name: '功能开关',
    code: 'frontend-config:features',
    type: 'PAGE',
    description: '功能开关页面',
    parentId: null, // 将在创建后设置
  },
  {
    id: uuidv4(),
    name: 'API配置',
    code: 'frontend-config:api',
    type: 'PAGE',
    description: 'API配置页面',
    parentId: null, // 将在创建后设置
  },

  // 服务端配置权限
  {
    id: uuidv4(),
    name: '服务端配置',
    code: 'server-config:manage',
    type: 'PAGE',
    description: '服务端配置管理',
    parentId: null,
  },
  {
    id: uuidv4(),
    name: '数据库配置',
    code: 'server-config:database',
    type: 'PAGE',
    description: '数据库配置页面',
    parentId: null, // 将在创建后设置
  },
  {
    id: uuidv4(),
    name: 'Redis配置',
    code: 'server-config:redis',
    type: 'PAGE',
    description: 'Redis配置页面',
    parentId: null, // 将在创建后设置
  },
  {
    id: uuidv4(),
    name: 'JWT配置',
    code: 'server-config:jwt',
    type: 'PAGE',
    description: 'JWT配置页面',
    parentId: null, // 将在创建后设置
  },

  // 系统监控权限
  {
    id: uuidv4(),
    name: '系统监控',
    code: 'system-monitor:manage',
    type: 'PAGE',
    description: '系统监控管理',
    parentId: null,
  },
  {
    id: uuidv4(),
    name: '系统概览',
    code: 'system-monitor:overview',
    type: 'PAGE',
    description: '系统概览页面',
    parentId: null, // 将在创建后设置
  },
  {
    id: uuidv4(),
    name: '日志管理',
    code: 'system-monitor:logs',
    type: 'PAGE',
    description: '日志管理页面',
    parentId: null, // 将在创建后设置
  },
  {
    id: uuidv4(),
    name: '性能监控',
    code: 'system-monitor:performance',
    type: 'PAGE',
    description: '性能监控页面',
    parentId: null, // 将在创建后设置
  },
]

// 初始角色数据
const initialRoles = [
  {
    id: uuidv4(),
    name: '超级管理员',
    description: '拥有系统所有权限的超级管理员角色',
    status: 'ACTIVE',
  },
  {
    id: uuidv4(),
    name: '系统管理员',
    description: '负责系统配置和用户管理的管理员角色',
    status: 'ACTIVE',
  },
  {
    id: uuidv4(),
    name: '内容管理员',
    description: '负责内容管理的管理员角色',
    status: 'ACTIVE',
  },
  {
    id: uuidv4(),
    name: '普通用户',
    description: '系统普通用户角色',
    status: 'ACTIVE',
  },
]

async function initRbacData() {
  try {
    console.log('开始初始化 RBAC 数据...')

    // 检查是否已经初始化过
    const existingPermissions = await prisma.permission.count()
    if (existingPermissions > 0) {
      console.log('RBAC 数据已存在，跳过初始化')
      return
    }

    // 创建权限数据
    console.log('创建权限数据...')

    // 首先创建父级权限
    const parentPermissions = initialPermissions.filter(p =>
      [
        'dashboard:view',
        'user:manage',
        'role:manage',
        'permission:manage',
        'frontend-config:manage',
        'server-config:manage',
        'system-monitor:manage',
      ].includes(p.code)
    )

    await prisma.permission.createMany({
      data: parentPermissions.map(p => ({
        ...p,
        type: p.type as any, // 类型转换：字符串转为PermissionType枚举
        parentId: p.parentId || undefined,
      })),
    })

    // 获取创建的父级权限
    const createdParents = await prisma.permission.findMany({
      where: {
        code: { in: parentPermissions.map(p => p.code) },
      },
    })

    // 设置子权限的 parentId
    const childPermissions = initialPermissions.filter(
      p => !parentPermissions.some(parent => parent.code === p.code)
    )

    // 为子权限设置正确的 parentId
    childPermissions.forEach(child => {
      if (child.code.startsWith('user:') && child.code !== 'user:manage') {
        child.parentId = createdParents.find(p => p.code === 'user:manage')?.id || null
      } else if (child.code.startsWith('role:') && child.code !== 'role:manage') {
        child.parentId = createdParents.find(p => p.code === 'role:manage')?.id || null
      } else if (child.code.startsWith('permission:') && child.code !== 'permission:manage') {
        child.parentId = createdParents.find(p => p.code === 'permission:manage')?.id || null
      } else if (
        child.code.startsWith('frontend-config:') &&
        child.code !== 'frontend-config:manage'
      ) {
        child.parentId = createdParents.find(p => p.code === 'frontend-config:manage')?.id || null
      } else if (child.code.startsWith('server-config:') && child.code !== 'server-config:manage') {
        child.parentId = createdParents.find(p => p.code === 'server-config:manage')?.id || null
      } else if (
        child.code.startsWith('system-monitor:') &&
        child.code !== 'system-monitor:manage'
      ) {
        child.parentId = createdParents.find(p => p.code === 'system-monitor:manage')?.id || null
      }
    })

    // 创建子权限
    await prisma.permission.createMany({
      data: childPermissions.map(p => ({
        ...p,
        type: p.type as any, // 类型转换：字符串转为PermissionType枚举
        parentId: p.parentId || undefined,
      })),
    })

    // 创建角色数据
    console.log('创建角色数据...')
    await prisma.role.createMany({
      data: initialRoles.map(r => ({
        ...r,
        status: r.status as any, // 类型转换
      })),
    })

    // 为超级管理员角色分配所有权限
    console.log('为超级管理员分配权限...')
    const superAdminRole = await prisma.role.findFirst({
      where: { name: '超级管理员' },
    })

    const allPermissions = await prisma.permission.findMany()

    if (superAdminRole) {
      const rolePermissions = allPermissions.map(permission => ({
        id: uuidv4(),
        roleId: superAdminRole.id,
        permissionId: permission.id,
      }))

      await prisma.rolePermission.createMany({
        data: rolePermissions,
      })
    }

    // 为系统管理员分配基础权限
    console.log('为系统管理员分配权限...')
    const systemAdminRole = await prisma.role.findFirst({
      where: { name: '系统管理员' },
    })

    if (systemAdminRole) {
      const adminPermissions = allPermissions.filter(
        p =>
          p.code.startsWith('dashboard:') ||
          p.code.startsWith('user:') ||
          p.code.startsWith('role:') ||
          p.code.startsWith('system-monitor:')
      )

      const adminRolePermissions = adminPermissions.map(permission => ({
        id: uuidv4(),
        roleId: systemAdminRole.id,
        permissionId: permission.id,
      }))

      await prisma.rolePermission.createMany({
        data: adminRolePermissions,
      })
    }

    // 为普通用户分配基础查看权限
    console.log('为普通用户分配权限...')
    const normalUserRole = await prisma.role.findFirst({
      where: { name: '普通用户' },
    })

    if (normalUserRole) {
      const userPermissions = allPermissions.filter(p => p.code === 'dashboard:view')

      const userRolePermissions = userPermissions.map(permission => ({
        id: uuidv4(),
        roleId: normalUserRole.id,
        permissionId: permission.id,
      }))

      await prisma.rolePermission.createMany({
        data: userRolePermissions,
      })
    }

    console.log('RBAC 数据初始化完成！')
    console.log(`创建了 ${allPermissions.length} 个权限`)
    console.log(`创建了 ${initialRoles.length} 个角色`)
  } catch (error) {
    console.error('初始化 RBAC 数据失败:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// 如果直接运行此脚本（使用CommonJS方式检测）
if (require.main === module) {
  initRbacData()
    .then(() => {
      console.log('初始化完成')
      process.exit(0)
    })
    .catch(error => {
      console.error('初始化失败:', error)
      process.exit(1)
    })
}

export { initRbacData }
