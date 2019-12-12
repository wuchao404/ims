import moment from 'moment';
import * as responseData from './responseData'

/**
 * 生成8位的随机码
 * @param oldF 
 * @param date 
 */
export const encryptFkey = (oldF: string, date: Date) => {
  const ddHHmmss = moment(date).format('DDHHmmss');
  const times = ddHHmmss.split('');
  return oldF.split('').map((str: string, index: number) => {
    const number = (str.charCodeAt(0) ^ (times[index].charCodeAt(0) + 32)) - 1;
    return String.fromCharCode(number);
  }).join('');
}
// 
export const resData = responseData;



