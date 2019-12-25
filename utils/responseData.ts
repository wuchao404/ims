export interface ResDataType {
  status?: number,
  message?: string,
  data?: any
}
// 定义通用的返回值
export const success = (info?: ResDataType) => {
  const {
    status = 200,
    message='操作成功',
    data
  } = info || {};
  return {status,message,data}
}
// 失败提示
export const error = (info?: ResDataType) => {
  const {
    status = 400,
    message='系统异常，请联系管理员',
    data
  } = info || {};
  return {status,message,data}
}
// 一般信息
export const info = (info?: ResDataType) => {
  const {
    status = 200,
    message='请求成功',
    data
  } = info || {};
  return {status,message,data}
}
