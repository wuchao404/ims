import React,{ useEffect,useState } from 'react';
import {homeListApi} from '../assets/api/home'
import { Button } from 'antd';

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
  

  return (
    <div>
      <p>{JSON.stringify(state.data)}</p>
      <Button onClick={getList}>查询</Button>
    </div>
  )
}