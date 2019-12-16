import React, { useEffect } from 'react';
import App from 'next/app';
import '../assets/style.less';
import Router from 'next/router';
import { inWhiteList } from '../router/whiteList';
import { hasToken } from '../utils/frontend/storage';
import routerMap from '../router/routerMap';

// 重写_app.js,详情查看 https://nextjs.org/docs#custom-app
export default (props: any) => {
  const { Component, pageProps } = props;

  // 路由即将发生变化（刷新页面不执行此方法）
  const handleRouteChangeStart = (url: string) => {
    notAlowNext(Router.pathname);
  }

  // 不允许进入页面的情况下，直接跳转`/login`。（不在白名单并且无token）
  const notAlowNext = (pathname = '') => {
    if (!inWhiteList(pathname) && !hasToken()){
      Router.replace(routerMap.login.pathname);
    }
  }
  useEffect(() => {
    notAlowNext(Router.pathname);
    Router.events.on('routeChangeStart', handleRouteChangeStart);
    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart);
    }
  }, []);
  

  return <Component {...pageProps} />
}