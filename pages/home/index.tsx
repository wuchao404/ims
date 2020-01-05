import React,{ useEffect,useState } from 'react';
import {homeListApi} from '../../assets/api/home'
import {logoutApi} from '../../assets/api/login'
import { Button } from 'antd';
import {clearAllStorage} from '../../utils/frontend/storage';
import {jumpToLogin} from '../../router/redirect'

export default () => {
  const initState = {
    data:{}
  };
  const [state, setState] = useState(initState);

  // setState方法
  const $set = (curState: any) => {
    if (typeof curState !== 'object') return;
    setState(preState => ({...preState, ...curState}))
  };
  const getList = () => {
    homeListApi().then(res => {
      $set({ data: res.data })
    })
  }
  // 突出登陆
  const logout = () => {
    logoutApi().then(res => {
      clearAllStorage();
      jumpToLogin();
    })
  }

  return (
    <div>
      <p>{JSON.stringify(state.data)}</p>
      <Button onClick={getList}>查询</Button>
      <div>
        <Button onClick={logout} type='dashed'>退出登陆</Button>
      </div>
    </div>
  )
}