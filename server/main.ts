import 'reflect-metadata'
import { InversifyExpressServer } from 'inversify-express-utils'
import { Container } from 'inversify'
import { User,Base } from '@/router/controller'
import { UserService,BaseService } from '@/router/service'
import express from 'express'
import { PrismaClient } from '@prisma/client'
import { PrismaDB } from '@/db'
import { JWT } from '@/jwt'
// 加载环境变量 少了无法直接读取到.env文件
import dotenv from 'dotenv';
dotenv.config();

const container = new Container()
/**
 * user模块
 */
container.bind(User).to(User)
container.bind(UserService).to(UserService)

/**
 * base模块
 */
container.bind(Base).to(Base)
container.bind(BaseService).to(BaseService)


/**
 *  封装PrismaClient
 */
container.bind<PrismaClient>('PrismaClient').toFactory(() => {
    return () => {
        return new PrismaClient()
    }
})
container.bind(PrismaDB).to(PrismaDB)
/**
 * jwt模块
 */
container.bind(JWT).to(JWT) //主要代码


const server = new InversifyExpressServer(container)
server.setConfig((app) => {
    app.use(express.json())
    app.use(container.get(JWT).init()) //主要代码
})
const app = server.build()

app.listen(3000, () => {
    console.log('Listening on port 3000')
})