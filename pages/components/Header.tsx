import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import './style/header.less';

const linkStyle = {
  marginRight: 15
};

const Header = () => {
  interface StateType {
    extraBreadcrumbItems: string[]
  }
  const initState: StateType = {
    extraBreadcrumbItems:[]
  };
  const [state, setState] = useState(initState);
  // setState方法
  const $set = (curState: any) => {
    if (typeof curState !== 'object') return;
    setState(preState => ({ ...preState, ...curState }))
  };
  useEffect(()=>{
   },[])
  return(
  <div className="header_div"  >
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>List</Breadcrumb.Item>
      <Breadcrumb.Item>App</Breadcrumb.Item>
    </Breadcrumb>
    
  </div>
  )
}

export default Header;