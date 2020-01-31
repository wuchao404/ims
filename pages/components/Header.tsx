import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Breadcrumb} from 'antd';
import './style/header.less';
import breadList from '../../assets/json/breads.json'
import _ from 'lodash';
import Router from 'next/router';

const Header = () => {
  interface StateType {
    routes: any[]
  }
  const initState: StateType = {
    routes:[]
  };
  const [state, setState] = useState(initState);
  // setState方法
  const $set = (curState: any) => {
    if (typeof curState !== 'object') return;
    setState(preState => ({ ...preState, ...curState }))
  };

  const getBreads = (pathname: string):any[] => {
    const home = { "path":"/", "breadcrumbName":"首页" };
    if (pathname === '/' || pathname === '/home') {
      return [home];
    }
    const breads = pathname.split('/').reduce((list: string[] ,item: string, index: number, arr: string[]) => {
      const bread = _.take(arr, index + 1).join('/');// 拆分后的路由
      const breadObj = getBreadObj(bread);// 面包屑对象
      if (breadObj) {
        list.push(breadObj)
      } 
      return list;
    },[])
    return [home, ...breads];
  }
  const getBreadObj = (path:string): any => {
    return breadList.find((item) => item.path === path);
  }
  const itemRender = (route:any, params:any[], routes:any[], paths: string[]) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link href={route}>
        <a>{route.breadcrumbName}</a>
      </Link>
    );
  }
  const setRoute = (pathname: string) => {
    const routes = getBreads(pathname);
    $set({routes});
  }
  // 路由已经改变（刷新页面不执行此方法）
  const handleRouteChangeComplete = (url: string) => {
    setRoute(url);
  }

  useEffect(()=>{
    setRoute(Router.pathname);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    }
  },[])
  return(
  <div className="header_div">
    <Breadcrumb itemRender={itemRender} routes={state.routes} />
  </div>
  )
}

export default Header;