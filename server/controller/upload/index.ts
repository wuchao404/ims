import { ImageModal } from './../../modal/image/imageModal';
import {Request, Response} from 'express';
import {IncomingForm, Fields, Files, File} from 'formidable';
import {success,error} from '../../../utils/responseData';
import {moveSync} from './uploadUtil';
import {insertImg, deleteSingleImage,querySingleImage} from '../../db/upload';
import fs from 'fs';

// 上传图片
export const upload = (req: Request, res: Response) => {
  // 步骤
  // 1.移动到指定目录（没有改目录则创建），并给更改文件名（按照业务id）
  // 2.根据文件路径生产图片url
  // 3.入库
  // 4.响应给前端
  const form = new IncomingForm();
  form.parse(req, (err: any, fields: Fields, files: Files) => {
    const {listId =''} = fields;
    const {fileName, url, diskPath} = moveSync(files.file, <string>listId);-
    insertImg({fileName, dirId: <string>listId, url, diskPath}).then((img: ImageModal) => {
      const {id = '', url = ''} = img;
      res.send(success({ data: {id, url} }));
    }).catch(() => {
      res.send(error({ message: '图片保存失败，请重新上传' }));
    })
  })
}

// 删除图片
export const deleteImg = (req: Request, res: Response) => {
  // 步骤
  // 1、根据图片id查找记录
  // 2.删除磁盘的记录和数据库的记录
  // 3.响应前端
  const {id = ''} = req.query;
  querySingleImage(id).then((img: ImageModal) => {
    const {diskPath = ''} = img;
    if (fs.existsSync(diskPath)) {
      fs.unlinkSync(diskPath);//删磁盘
    }
    deleteSingleImage(id).then(() => {;// 删库
      res.send(success());
    })
  }).catch((err: any) => {
    console.error('deleteImg: ',err)
    res.send(error({ message: '删除失败' }))
  })

}


