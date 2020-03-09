import {Request, Response} from 'express';
import {IncomingForm, Fields, Files, File} from 'formidable';
import {success} from '../../../utils/responseData';
import fs, {Stats} from 'fs';
import {UUID} from '../../tools/unique'
import {nginxDir, origin} from '../../config';
import path from 'path';

export const upload = (req: Request, res: Response) => {
  // 步骤
  // 1.移动到指定目录（没有改目录则创建），并给更改文件名（按照业务id）
  // 2.根据文件路径生产图片url
  // 3.入库
  // 4.响应给前端
  const form = new IncomingForm();
  form.parse(req, (err: any, fields: Fields, files: Files) => {
    const {fileName = '', url} = moveSync(files.file,'123');
    console.log('files: ', files)
    console.log('fields: ', fields)
    res.send(success({ data: url }));
  })
}

// 将文件移动到指定目录，并返回文件信息
const moveSync = (file: File,id: string):{fileName: string, url: string} => {
  const {path:oldPath = '', type = '',name = ''} = file;
  const fileName = `${new UUID().v4()}-${new Date().getTime()}${path.extname(name)}`;// 重命名图片
  const dirName = `images/${id}`;
  if (!fs.existsSync(`${nginxDir}/${dirName}`)) {
    fs.mkdirSync(`${nginxDir}/${dirName}`,{ recursive: true });// 不存在在创建
  }
  const newPath = `${nginxDir}/${dirName}/${fileName}`;
  fs.renameSync(oldPath, newPath);
  return {
    fileName,
    url: `${origin}/${dirName}/${fileName}` // http开头的url
  }
}
