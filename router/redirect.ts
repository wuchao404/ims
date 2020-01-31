import Router from 'next/router';
import routerMap from './routerMap'

// 跳转登录页
export const jumpToLogin = (): void => {
  const isLogin = Router.pathname === routerMap.login.pathname;
  !isLogin && Router.replace(routerMap.login.pathname);
}