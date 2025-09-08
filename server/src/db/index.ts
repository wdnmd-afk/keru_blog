import { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'inversify'

// @ts-ignore
@injectable()
export class PrismaDB {
  prisma: PrismaClient
  constructor(@inject('PrismaClient') PrismaClient: () => PrismaClient) {
    this.prisma = PrismaClient()
  }
}
