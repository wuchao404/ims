
import {Request, Response} from 'express';
import * as ResData from '../../../utils/responseData'

// 获取帖子列表
export const getInfoList = (req: Request, res: Response) => {
  const data = ResData.success({
    data: []
  })
  res.send(data);
}