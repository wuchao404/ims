import React, { useEffect, useState } from 'react';
import './style/navigation.less'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { string } from 'prop-types';

const Navigation = (props: any) => {

  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const MenuConfig = [
    {
        title:'首页',
        key:'/admin/home',
        icon:'pie-chart'
    },
    {
        title:'UI',
        icon:'pie-chart',
        key:'/ui',
        children:[
            {
                title: '按钮',
                key: '/ui/buttons',

            },
            {
                title: '弹框',
                key: '/ui/modals',
            },
            {
                title: 'Loading',
                key: '/ui/loadings',
            },
            {
                title: '通知提醒',
                key: '/ui/notification',
            },
            {
                title: '全局Message',
                key: '/ui/messages',
            },
            {
                title: 'Tab页签',
                key: '/ui/tabs',
            },
            {
                title: '图片画廊',
                key: '/ui/gallery',
            },
            {
                title: '轮播图',
                key: '/ui/carousel',
            }            
        ]        
    },
    {
        title:'表单',
        key:'/from',
        icon:'pie-chart',
        children: [
            {
                title: '登录',
                key: '/form/login',
            },
            {
                title: '注册',
                key: '/form/reg',
            }
        ]       
    },
    {
        title:'表格',
        key:'/table',
        icon:'pie-chart',
        children: [
            {
                title: '基础表格',
                key: '/table/basic',
            },
            {
                title: '高级表格',
                key: '/table/high',
            }
        ]        
    },
    {
        title:'富文本',
        icon:'pie-chart',
        key:'/rich'        
    },
    {
        title:'城市管理',
        icon:'pie-chart',
        key:'/city'        
    },
    {
        title:'订单管理',
        key:'/order',
        icon:'pie-chart',
        btnList: [
            {
                title: '订单详情',
                key: 'detail'
            },
            {
                title: '结束订单',
                key: 'finish'
            }
        ]              
    },
    {
        title:'员工管理',
        icon:'pie-chart',
        key:'/user'        
    },
    {
        title:'车辆地图',
        icon:'pie-chart',
        key:'/bikeMap'        
    },
    {
        title:'图标',
        key:'/charts',
        icon:'pie-chart',
        children: [
            {
                title: '柱形图',
                key: '/charts/bar'
            },
            {
                title: '饼图',
                key: '/charts/pie'
            },
            {
                title: '折线图',
                key: '/charts/line'
            },
        ]       
    },
    {
        title: '权限设置',
        icon:'pie-chart',
        key: '/permission'
    },
]
interface StateType {
  openKeys: string,
  menuTreeNode:any[],
  rootSubmenuKeys: string[]
}
const initState: StateType = {
  openKeys: '',
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
  
  const onOpenChange = (openKeys:any) => {
    
    
    const latestOpenKey= openKeys.find((key: string) => state.openKeys.indexOf(key) === -1);
    console.log(state.openKeys)
    console.log(openKeys)
    // console.log(latestOpenKey)
    // if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //   $set({ openKeys });
    // } else {
    //   $set({
    //     openKeys: latestOpenKey ? [latestOpenKey] : [],
    //   });
    // }
  };
const renderMenu = (data:any)=>{
  return data.map((item:any)=>{
    if(!item.children){
      return(
        <Menu.Item key={item.key}>
          {
            item.icon?<Icon type={item.icon}/> : ""
          }
          <span>{item.title}</span>
        </Menu.Item>
      )
    }else{
      // 错误写法
      // state.rootSubmenuKeys.push(item.key)
      // 正确的写法
      $set({
        rootSubmenuKeys: [
          ...state.rootSubmenuKeys,
          item.key
        ]
      });
      return(
        <SubMenu
          key={item.key}
          title={
            <span>
              {
                item.icon?<Icon type={item.icon}/> : ""
              }
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