// 无导航的页面，这些页面都是全屏页面，没有导航，也没有面包屑
const notNavList = [
  '/login',
  '/login/register',
]
export default notNavList;

/**
 * 此页面是否不含导航
 * @param pathname  访问路径
 * @return boolean
 */
export const isNotNav = (pathname =''): boolean => {
  console.log('pathname:',pathname)
  return notNavList.findIndex(path => path === pathname) >= 0;
}