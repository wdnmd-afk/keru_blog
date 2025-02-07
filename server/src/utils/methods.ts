import crypto from 'node:crypto'
import { Result } from '@/utils/result'
import jsonwebtoken from 'jsonwebtoken'

const hashString = (str: string, random: number) => {
    const hash = crypto.createHash('md5')
    hash.update(str)
    const hashedString = hash.digest('hex')
    console.log(hashedString, 'old')

    const newHash = crypto.createHash('md5')
    newHash.update(hashedString + random)
    console.log(newHash, 'new')
    return newHash.digest('hex')
}

/**
 * 生成一个唯一的 bigInt ID
 * @returns {bigint} 唯一的 bigInt ID
 */
const generateUniqueBigIntId = (isString?:boolean): bigint|string => {
    const timestamp = BigInt(Date.now()) // 获取当前时间戳
    const randomPart = BigInt(Math.floor(Math.random() * 1e10)) // 随机生成一个大整数部分
    const id = timestamp * BigInt(1e10) + randomPart
    return isString?id.toString():id // 组合为一个唯一的大整数
}

const handleError = (errors: any[], callBack: Function) => {
    if (errors.length) {
        const messages = errors.map(error => {
            return Object.values(error.constraints || {}).join(',')
        })
        return Result.validationError(messages.join(','))
    } else {
        return callBack()
    }
}
//获取JWT信息
const getJwt = (req:any)=>{
    const secret = 'keru$%^&*()asdsd'
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return null

    return jsonwebtoken.verify(token, secret)
}


export { hashString, generateUniqueBigIntId, handleError,getJwt }