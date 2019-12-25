import {Request, Response} from 'express';
import * as ResData from '../../../utils/responseData'

interface ParamType {
  [props: string]: any
}
// 校验必传参数
export class ValidateParams {
  private params: ParamType = {};
  private checked: boolean = false;
  constructor(params: ParamType) {
    this.params = params;
  }
  // 校验是否含有空值
  private isEmpty(): boolean{
    return Object.keys(this.params).findIndex(key => {// 查找json中是否有为空的value（排除number=0）
      const value = this.params[key];
      return value !==0 && !value
    }) >= 0;
  }
  /**
   * 校验必传参数。校验不通过则返回false，并且响应错误报文
   * @param req 
   * @param res 
   */
  public validate(req: Request, res: Response): boolean {
    const isEmpty = this.isEmpty();
    isEmpty && res.send(ResData.error({ message: '参数错误'}));
    return !isEmpty;
  }
}