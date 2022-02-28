import { extname } from 'path'
import * as fs from 'fs'
import { IFile } from '@szakszolg-nx/api-interfaces'

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|tiff)$/)) {
        return callback(new Error('Only image files are allowed!'), false)
    }
    callback(null, true)
}

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0]
    const fileExtName = extname(file.originalname)
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('')
    callback(null, `${name}--${randomName}${fileExtName}`)
}

export function readDirAsync(path: string) {
    return new Promise<IFile[]>(function (resolve, reject) {
        fs.readdir(path, async function (err, filenames) {
            if (err) {
                reject(err)
            } else {
                const result: Promise<IFile>[] = []
                filenames.forEach((filename) => {
                    result.push(fstatAsync(`${path}/${filename}`))
                })
                resolve(await Promise.all(result))
            }
        })
    })
}

export function fstatAsync(path: string): Promise<IFile> {
    return new Promise<IFile>(function (resolve, reject) {
        fs.stat(path, function (err, stats) {
            if (err) {
                reject(err)
            } else {
                resolve({
                    path,
                    createdAt: stats.birthtimeMs,
                    size: stats.size,
                    isFile: stats.isFile(),
                })
            }
        })
    })
}
