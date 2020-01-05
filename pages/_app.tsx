import React, { useEffect } from 'react';
import App from 'next/app';
import '../assets/style.less';
import Router from 'next/router';
import { inWhiteList } from '../router/whiteList';
import { hasToken } from '../utils/frontend/storage';
import { jumpToLogin } from '../router/redirect'
import Main from './components/Main'
// 重写_app.js,详情查看 https://nextjs.org/docs#custom-app
export default (props: any) => {
  const { Component, pageProps } = props;

  // 路由已经改变（刷新页面不执行此方法）
  const handleRouteChangeComplete = (url: string) => {
    notAlowNext(Router.pathname);
  }

  // 不允许进入页面的情况下，直接跳转`/login`。（不在白名单并且无token）
  const notAlowNext = (pathname = '') => {
    if (!inWhiteList(pathname) && !hasToken()){
      jumpToLogin();
    }
  }
  useEffect(() => {
    notAlowNext(Router.pathname);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    }
  }, []);
  

  return(
    <Main>
      <Component {...pageProps} />
    </Main>
  ) 
  
}