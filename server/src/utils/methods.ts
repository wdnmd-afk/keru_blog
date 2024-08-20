
import crypto from 'node:crypto'
const hashString = (str: string,random:number) => {
    const hash = crypto.createHash('md5');
    hash.update(str);
    const hashedString = hash.digest('hex');
    console.log(hashedString,'old')

    const newHash = crypto.createHash('md5')
    newHash.update(hashedString+random)
    console.log(newHash,'new')
    return newHash.digest('hex')
}

/**
 * 生成一个唯一的 bigInt ID
 * @returns {bigint} 唯一的 bigInt ID
 */
const generateUniqueBigIntId = (): bigint=> {
    const timestamp = BigInt(Date.now()); // 获取当前时间戳
    const randomPart = BigInt(Math.floor(Math.random() * 1e10)); // 随机生成一个大整数部分
    return timestamp * BigInt(1e10) + randomPart; // 组合为一个唯一的大整数
}



export {hashString,generateUniqueBigIntId}