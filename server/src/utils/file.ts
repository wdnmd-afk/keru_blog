import fse from 'fs-extra'
import path from 'node:path'
import process from 'node:process'

const UPLOAD_DIR = path.resolve(process.cwd(), 'temp')

// 提取文件后缀名
const extractExt = (fileName: string) => {
  console.log(fileName, 'fffle')
  // 查找'.'在fileName中最后出现的位置
  const lastIndex = fileName.lastIndexOf('.')
  // 如果'.'不存在，则返回空字符串
  if (lastIndex === -1) {
    return ''
  }
  // 否则，返回从'.'后一个字符到fileName末尾的子串作为文件后缀（不包含'.'）
  return fileName.split('.').pop()
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
  return fse.existsSync(getChunkDir(fileHash)) ? await fse.readdir(getChunkDir(fileHash)) : []
}
// 把文件切片写成总的一个文件流
const pipeStream = (path: string, writeStream: fse.WriteStream) => {
  return new Promise((resolve, reject) => {
    // 创建可读流
    const readStream = fse.createReadStream(path)

    readStream.on('error', err => {
      console.error('读取文件切片时发生错误:', err)
      writeStream.destroy() // 销毁写入流
      reject(err)
    })

    writeStream.on('error', err => {
      console.error('写入文件时发生错误:', err)
      readStream.destroy() // 销毁读取流
      reject(err)
    })

    // 在指定位置写入文件流
    readStream.pipe(writeStream)

    writeStream.on('finish', () => {
      // 写入完成后，删除原切片文件
      try {
        if (fse.existsSync(path)) {
          fse.unlinkSync(path)
        }
        resolve(1)
      } catch (err) {
        console.error('删除切片文件时发生错误:', err)
        resolve(1) // 即使删除失败也认为合并成功
      }
    })
  })
}

export { createUploadedList, extractExt, getChunkDir, pipeStream }
