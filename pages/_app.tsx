import React, { useState,useEffect } from 'react';
import App from 'next/app';
import '../assets/style.less';
import {useRouter} from 'next/router';
import { inWhiteList } from '../router/whiteList';
import { isNotNav } from '../router/notNavList';
import { hasToken } from '../utils/frontend/storage';
import { jumpToLogin } from '../router/redirect';
import Main from './components/Main'
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
// 重写_app.js,详情查看 https://nextjs.org/docs#custom-app
export default (props: any) => {
  const { Component, pageProps } = props;
  const Router = useRouter();
  
  interface StateType {
    showNav:boolean
  }
  const initState:StateType = {
    showNav:false,// 是否展示导航
  };
  const [state, setState] = useState(initState);

  // setState方法
  const $set = (curState: any) => {
    if (typeof curState !== 'object') return;
    setState(preState => ({...preState, ...curState}))
  };
  // 路由已经改变（刷新页面不执行此方法）
  const handleRouteChangeComplete = (url: string) => {
    interception(url);
  }
  
  // 不允许进入页面的情况下，直接跳转`/login`。（不在白名单并且无token）
  const notAlowNext = (pathname = '') => {
    if (!inWhiteList(pathname) && !hasToken()){
      jumpToLogin();
    }
  }
  // 是否展示导航
  const setNavVisible = (pathname = '') => {
    const showNav = !isNotNav(pathname)
    console.log('showNav:',showNav)
    $set({ showNav });
  }
  // 根据路由改变状态
  const interception = (pathname = '') => {
    notAlowNext(pathname);
    setNavVisible(pathname);
  }
  useEffect(() => {
    interception(Router.pathname);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    }
  }, []);
  //新增国际化方法
  return (
    state.showNav ?
    <ConfigProvider 
    // locale={zhCN}
    >
      <Main>
        <Component {...pageProps} />
      </Main>
    </ConfigProvider>
    :
    <ConfigProvider  
    // locale={zhCN}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  )
}