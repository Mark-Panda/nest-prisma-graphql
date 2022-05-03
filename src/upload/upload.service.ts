/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as formidable from 'formidable';
import * as concat from 'concat-files';
import { uploadDir } from 'commons/public-tool';
import { LoggerService } from 'commons/public-module';

@Injectable()
export class UploadService {
    constructor(private readonly logger: LoggerService) {}

    checkFile(req: any, res: any) {
        const query = req.query;
        const fileName = query.fileName;
        const fileMd5Value = query.fileMd5Value;
        // 获取文件Chunk列表
        getChunkList(
            path.join(uploadDir, fileName),
            path.join(uploadDir, fileMd5Value),
            (data) => {
                res.send(data);
            },
        );
    }

    checkChunk(req: any, res: any) {
        const query = req.query;
        const chunkIndex = query.index;
        const md5 = query.md5;
        fs.stat(path.join(uploadDir, md5, chunkIndex), (err, stats) => {
            if (stats) {
                res.send({
                    stat: 1,
                    exit: true,
                    desc: 'Exit 1',
                });
            } else {
                res.send({
                    stat: 1,
                    exit: false,
                    desc: 'Exit 0',
                });
            }
        });
    }

    // 上传切片
    async uploadChunk(req: any, res: any) {
        const form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, file) {
            const index = fields.index;
            const total = fields.total;
            const fileMd5Value = fields.fileMd5Value;
            const folder = path.resolve(uploadDir, fileMd5Value);
            folderIsExit(folder).then((val) => {
                const destFile = path.resolve(folder, fields.index);
                copyFile(file.data.filepath, destFile).then(
                    (successLog) => {
                        res.send({
                            stat: 1,
                            desc: index,
                            message: successLog,
                        });
                    },
                    (errorLog) => {
                        res.send({
                            stat: 0,
                            desc: 'Error',
                            message: errorLog,
                        });
                    },
                );
            });
        });
        // 文件夹是否存在, 不存在则创建文件
        function folderIsExit(folder) {
            return new Promise(async (resolve, reject) => {
                await fs.ensureDirSync(path.join(folder));
                resolve(true);
            });
        }
        // 把文件从一个目录拷贝到别一个目录
        function copyFile(src, dest) {
            const promise = new Promise((resolve, reject) => {
                fs.rename(src, dest, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('拷贝文件:' + dest + ' 成功!');
                    }
                });
            });
            return promise;
        }
    }

    // 合并切片
    async merageChuank(req: any, res: any) {
        const query = req.query;
        const md5 = query.md5;
        const size = query.size;
        const fileName = query.fileName;
        const tmpDir = path.join(uploadDir, md5);
        mergeFiles(tmpDir, uploadDir, fileName, size);
        res.send({
            stat: 1,
        });
    }
}

// 获取文件Chunk列表
async function getChunkList(filePath, folderPath, callback) {
    const isFileExit = await isExist(filePath);
    let result = {};
    // 如果文件(文件名, 如:node-v7.7.4.pkg)已在存在, 不用再继续上传, 直接秒传
    if (isFileExit) {
        result = {
            stat: 1,
            file: {
                isExist: true,
                name: filePath,
            },
            desc: '文件已经存在',
        };
    } else {
        const isFolderExist = await isExist(folderPath);
        // 如果文件夹(md5值后的文件)存在, 就获取已经上传的块
        let fileList: any = [];
        if (isFolderExist) {
            fileList = await listDir(folderPath);
        }
        result = {
            stat: 1,
            chunkList: fileList,
            desc: 'folder list',
        };
    }
    callback(result);
}

// 文件或文件夹是否存在
function isExist(filePath) {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, stats) => {
            // 文件不存在
            if (err && err.code === 'ENOENT') {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

// 列出文件夹下所有文件
function listDir(path): any {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err: any, data: any) => {
            if (err) {
                reject(err);
                return;
            }
            // 把mac系统下的临时文件去掉
            if (data && data.length > 0 && data[0] === '.DS_Store') {
                data.splice(0, 1);
            }
            resolve(data);
        });
    });
}
// 合并文件
async function mergeFiles(srcDir, targetDir, newFileName, size) {
    // eslint-disable-next-line prefer-rest-params
    console.log(...arguments);
    fs.createWriteStream(path.join(targetDir, newFileName));
    const fileArr = await listDir(srcDir);
    fileArr.sort((x, y) => {
        return x - y;
    });
    // 把文件名加上文件夹的前缀
    for (let i = 0; i < fileArr.length; i++) {
        // 拼接路径
        fileArr[i] = srcDir + '/' + fileArr[i];
    }
    concat(fileArr, path.join(targetDir, newFileName), () => {
        console.log('文件合并完成!');
        // 当合并完切片后，删除hash文件夹
        deleteFolder(srcDir);
    });
}

//删除本地文件夹 并递归删除所有文件和文件夹
const deleteFolder = (path: any) => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file) => {
            const curPath = path + '/' + file;
            if (fs.statSync(curPath).isDirectory()) {
                // recurse
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                deleteFolder(curPath);
            } else {
                // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
