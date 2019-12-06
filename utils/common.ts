import moment from 'moment';
import express,{} from 'express'

export const encryptFkey = (oldF: string, date: Date) => {
  const ddHHmmss = moment(date).format('DDHHmmss');
  const times = ddHHmmss.split('');
  return oldF.split('').map((str: string, index: number) => {
    const number = (str.charCodeAt(0) ^ (times[index].charCodeAt(0) + 32)) - 1;
    return String.fromCharCode(number);
  }).join('');
}
interface ResDataType {
  status?: number,
  message?: string,
  data?: any
}
// 定义通用的返回值
export const SuccessData = ({status=200,message='',data=undefined}: ResDataType) => {
  return {status,message,data}
}
export const ErrorData = ({status=400,message='系统异常',data=undefined}: ResDataType) => {
  return {status,message,data}
}


