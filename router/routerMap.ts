interface Router {
  pathname: string,// 路径
  bread: string, // 路径别名（用于面包屑）
}
type RouterMap  = {
  [alias: string]: Router
}
const routerMap: RouterMap = {
  'root': {
    pathname: '/',
    bread: '首页'
  },
  'login': {
    pathname: '/login',
    bread: '登录页'
  },
  home: {
    pathname: '/home',
    bread: '主页'
  },
}

export default routerMap;