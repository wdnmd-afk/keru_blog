import path from 'node:path'
import fse from 'fs-extra'
import process from 'node:process'
import multiparty from 'multiparty'

const UPLOAD_DIR = path.resolve(process.cwd(), 'temp')

// 提取文件后缀名
const extractExt = (fileName: string) => {
    // 查找'.'在fileName中最后出现的位置
    const lastIndex = fileName.lastIndexOf('.')
    // 如果'.'不存在，则返回空字符串
    if (lastIndex === -1) {
        return ''
    }
    // 否则，返回从'.'后一个字符到fileName末尾的子串作为文件后缀（包含'.'）
    return fileName.slice(lastIndex)
}
// 创建临时文件夹用于临时存储 所有的文件切片
const getChunkDir = (fileHash: string) => {
    // 添加 chunkCache 前缀与文件名做区分
    // target/chunkCache_fileHash值
    return path.resolve(UPLOAD_DIR, `chunkCache_${fileHash}`)
}
// 返回已上传的所有切片名
const createUploadedList = async (fileHash: string) => {
    // 如果存在这个目录则返回这个目录下的所有切片
    // fse.readdir返回一个数组，其中包含指定目录中的文件名。
    return fse.existsSync(getChunkDir(fileHash))
        ? await fse.readdir(getChunkDir(fileHash))
        : []
}

const uploadFile = async (file: any) => {
    const form = new multiparty.Form()
    return new Promise((resolve, reject) => {
        form.parse(file, (err: any, fields: any, files: any) => {
            if (err) {
                reject(err)
            } else {
                resolve(files)
            }
        })
    })
}

export { extractExt, createUploadedList, getChunkDir }
