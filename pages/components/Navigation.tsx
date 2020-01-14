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
    rootSubmenuKeys: string[],
    selectedKeys: string[],
  }
  const initState: StateType = {
    openKeys: [],
    menuTreeNode:[],
    rootSubmenuKeys:[],
    selectedKeys:[]
  };
  const [state, setState] = useState(initState);
  // setState方法
  const $set = (curState: any) => {
    if (typeof curState !== 'object') return;
    setState(preState => ({ ...preState, ...curState }))
  };
  
  useEffect(()=>{
    const menuTreeNode=renderMenu(MenuConfig)
    $set({menuTreeNode});
    initOpenKeys(Router.pathname);
    initSelectKeys(Router.pathname);
  },[])
  // 点击菜单，高亮
  const onOpenChange = (openKeys: string[]) => {
    const lastKey = openKeys.length > 0 ? openKeys[openKeys.length - 1] : '';// 总是取数组最后一个元素
    const keys = lastKey ?  [lastKey] : [];
    console.log('keys:',keys);
    $set({ openKeys: keys});
  };
  const initSelectKeys = (pathname: string) => {
    $set({selectedKeys: [pathname]});
  }
  // 初始化导航栏展开项
  const initOpenKeys = (pathname = '') => {
    const subMenu = findKey(pathname,MenuConfig);
    console.log('subMenu: ',subMenu);
    $set({openKeys: [subMenu]});
  }
  // 根据路径查找一级菜单
  const findKey = (key: string, arr: any[]): any => {
    let init = '';
    const find = (key: string, arr: any[]) => {
      arr.map((item, index) => {
        if (item.key === key) {
          init = item.subKey;
        }else if (item.children && item.children.length > 0){
          find(key, item.children);
        }
      })
    }
    find(key,arr);
    return init;
  }
  const renderMenu = (data:any[])=>{
    return data.map(  (item:any)=>{
      if(!item.children){
        return(
            <Menu.Item 
              key={item.key}
              onClick={() => {
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
          selectedKeys={state.selectedKeys}
          onSelect={({selectedKeys}) => $set({selectedKeys})}
       >
         {state.menuTreeNode}
        </Menu>
    </div>
  )
}
export default Navigation;