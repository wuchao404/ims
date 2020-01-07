
import moment from 'moment';

/**
 * 年-月-日 时:分:秒
 * @param utcTime utc国际标准时间格式
 */
export const formatDateTime = (utcTime: string): string => {
  return utcTime ? moment(utcTime).format('YYYY-MM-DD HH:mm:ss') : '';
}