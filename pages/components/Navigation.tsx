import React, { useEffect, useState } from 'react';
import './style/navigation.less'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import MenuConfig from '../../assets/json/menu.json';
import { useRouter } from 'next/router';
import _ from 'lodash';


const Navigation = (props: any) => {

  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const Router = useRouter();

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
  
  useEffect(()=>{
    const menuTreeNode=renderMenu(MenuConfig)
    $set({menuTreeNode})
  },[])
  
  const onOpenChange = (openKeys: string[]) => {
    const lastKey = openKeys.length > 0 ? openKeys[openKeys.length - 1] : '';// 总是取数组最后一个元素
    const keys = lastKey ?  [lastKey] : []
    $set({ openKeys: keys});
  };
  // 初始化导航栏展开项
  const initOpenKeys = (pathname = '') => {
    console.log('路由：',pathname);
    const key = findKey(pathname,MenuConfig)
    console.log('key:',key);
  }
  const findKey = (key: string, arr: any[]): string => {
    const result = _.find(arr, {key: key});
    console.log('result: ',result)
    return '';
  }
  const renderMenu = (data:any[])=>{
    return data.map(  (item:any)=>{
      if(!item.children){
        return(
            <Menu.Item 
              key={item.key}
              onClick={() => {
                initOpenKeys(item.key);
                Router.push(item.key!);
              }}
            >
              { item.icon && <Icon type={item.icon}/> }
                <span>{item.title}</span>
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
          openKeys={state.openKeys}
       >
         {state.menuTreeNode}
        </Menu>
    </div>
  )
}
export default Navigation;