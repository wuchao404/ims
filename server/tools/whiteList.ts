// 接口白名单
const whiteList = [
  '/api/doLogin',
  '/api/register',
  '/api/upload/up',
  '/api/upload/delete',
  '/api/register/checkUsername',
]
export default whiteList;

/**
 * 路径是否在白名单中
 * @param pathname  访问路径
 * @return boolean
 */
export const inWhiteList = (pathname =''): boolean => {
  return whiteList.findIndex(path => path === pathname) >= 0;
}