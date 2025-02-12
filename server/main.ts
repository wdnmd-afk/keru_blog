import 'reflect-metadata'
import { InversifyExpressServer } from 'inversify-express-utils'
import { Container } from 'inversify'
import { Base, File, User } from '@/router/controller'
import { BaseService, FileService, UserService } from '@/router/service'
import express from 'express'
import { PrismaClient } from '@prisma/client'
import { PrismaDB } from '@/db'
import { JWT } from '@/jwt'
import path from 'path'
import { AuthenticationErrorHandler, errorHandlingMiddleware, responseHandler } from '@/middleware'
// 加载环境变量 少了无法直接读取到.env文件
import dotenv from 'dotenv'
import process from 'node:process'

dotenv.config()

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
 * file模块
 */
container.bind(File).to(File)
container.bind(FileService).to(FileService)
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
    //passport-jwt自我校验
    app.use(container.get(JWT).init())
    //token错误校验
    app.use(AuthenticationErrorHandler)
    //常规错误中间件
    app.use(errorHandlingMiddleware())
    //响应请求中间件
    app.use(responseHandler)
    // 静态文件托管
    // 假设你要托管的静态文件位于 'public' 文件夹
    app.use('/static',express.static(path.resolve(process.cwd(), 'static')))
})
const app = server.build()



app.listen(3000, () => {
    console.log('Listening on port 3000')
})