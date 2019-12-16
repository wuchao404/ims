
// 设置token
export const setToken = (token = '' ): void => {
  window.localStorage.setItem('token', token);
}
// 获取token
export const getToken = (): string => {
  return window.localStorage.getItem('token') || '';
}
// 是否存在token
export const hasToken = () :boolean => {
  return !!getToken();
}
// 清除所有缓存
export const clearAllStorage = () => {
  window.sessionStorage.clear();
  window.localStorage.clear();
}