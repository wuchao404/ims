import fs, {Stats} from 'fs';
import {UUID} from '../../tools/unique'
import {nginxDir, origin} from '../../config';
import path from 'path';
import {File} from 'formidable';


// 将文件移动到指定磁盘目录，并返回文件信息
export const moveSync = (file: File,dirId: string):{fileName: string, url: string, diskPath: string} => {
  const {path:oldPath = '', type = '',name = ''} = file;
  const fileName = `${new UUID().v4()}-${new Date().getTime()}${path.extname(name)}`;// 重命名图片
  const dirName = `images/${dirId}`;
  if (!fs.existsSync(`${nginxDir}/${dirName}`)) {
    fs.mkdirSync(`${nginxDir}/${dirName}`,{ recursive: true });// 不存在在创建
  }
  const newPath = `${nginxDir}/${dirName}/${fileName}`;
  fs.renameSync(oldPath, newPath);
  return {
    fileName:name,
    url: `${origin}/${dirName}/${fileName}`, // http开头的url
    diskPath:newPath
  }
}