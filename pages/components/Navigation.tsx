import React, { useEffect, useState } from 'react';
import './style/navigation.less'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import MenuConfig from '../../assets/json/menu.json';
import { useRouter } from 'next/router';
import Link from 'next/link'


const Navigation = (props: any) => {

  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;

interface StateType {
  openKeys: string[],
  menuTreeNode:any[],
  rootSubmenuKeys: string[]
}
const initState: StateType = {
  openKeys: [],
  menuTreeNode:[],
  rootSubmenuKeys:[]
};
const [state, setState] = useState(initState);
// setState方法
const $set = (curState: any) => {
  if (typeof curState !== 'object') return;
  setState(preState => ({ ...preState, ...curState }))
};
  const Router = useRouter();
  useEffect(()=>{
   const menuTreeNode=renderMenu(MenuConfig)
   $set({menuTreeNode})
  },[])
  
  const onOpenChange = (openKeys:any) => {
    const latestOpenKey= openKeys.find((key: string) => state.openKeys.indexOf(key) === -1);
    console.log(latestOpenKey)
    if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      console.log(openKeys)
      $set({ openKeys });
    } else {
      $set({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
      console.log(state.openKeys)
    }
  };
const renderMenu = (data:any[])=>{
  return data.map((item:any)=>{
    if(!item.children){
      return(
        
          <Menu.Item 
            key={item.key}
            onClick={() => {
              Router.push(item.key!);
            }}
          >
            { item.icon && <Icon type={item.icon}/> }
            {/* <Link prefetch  href={item.key}> */}
              <span>{item.title}</span>
            {/* </Link> */}
          </Menu.Item>
        
      )
    }else{
      return(
        <SubMenu
          key={item.key}
          title={
            <span>
              { item.icon && <Icon type={item.icon}/> }
              <span>{item.title}</span>
            </span>
          }
        >
          {renderMenu(item.children) }
        </SubMenu>
      )
    }
  })
}
  return (
    <div className="navigation_div">
       <Menu theme="dark" mode="inline"
          onOpenChange={onOpenChange}
       >
         {state.menuTreeNode}
        </Menu>
    </div>
  )
}
export default Navigation;