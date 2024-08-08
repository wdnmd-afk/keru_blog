import { injectable, inject } from 'inversify'
import { PrismaClient } from '@prisma/client'

// @ts-ignore
@injectable()
export class PrismaDB {
    prisma: PrismaClient
    constructor(@inject('PrismaClient') PrismaClient: () => PrismaClient) {
        this.prisma = PrismaClient()
    }
}
