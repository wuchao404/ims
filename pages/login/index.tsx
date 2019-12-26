import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import FormSate from "../components/formItem";
import './index.less';
import axios from '../../utils/axios'
import { setToken } from '../../utils/frontend/storage';
import Router from 'next/router'
import routerMap from '../../router/routerMap';
import { loginApi } from '../../assets/api/login'
import { userName, passWord } from "../../assets/utils/utils";

// interface IForm {
//   title: string,
//   loginSta: boolean,
//   name?: string,
//   [key: string]: any
// }



function formmart(props: any) {
  useEffect(() => {
    console.log(props)
    console.log(state,"aaaaa")
  }, []);
  const { getFieldDecorator, getFieldsError } = props.form;
  const initState = {
    loading: false,
    username: '',
    password: '',
    againpassword: '',
    disabled:false
};
const [state, setState] = useState(initState);

// setState方法
const $set = (curState: any) => {
  if (typeof curState !== 'object') return;
  setState(preState => ({ ...preState, ...curState }))
};
// 登录接口
const doLogin = () => {
  console.log(state)
  if(!state.password||!state.againpassword||!state.password){
    return
  }
  if(state.password!==state.againpassword){
    return
  }
  
  console.log("成功")
  loginApi({
    username: state.username,
    password: state.password
  }).then(res => {
    if (res.data.status === 200) {
      setToken(res.data.data.token);
      Router.replace(routerMap.home.pathname);
    }
  })
}

const validUser = (rule: any, val: any, callback: any) => {
  if (!userName(val)) { // 正则验证
    if (val !== "") {
      callback('请输入正确的用户名'); // 校验未通过
    }
  }
  callback(); // 校验通过
}
const validPassWord = (rule: any, val: any, callback: any) => {
  let loginpass=props.form.getFieldValue('password');
  if (loginpass && loginpass !== val) {
    callback(new Error('两次密码输入不一致'))
    return
  } else {
    callback();
  }
}
const handleSearch =( e :any)=> {
  e.preventDefault();
  props.form.validateFields((err:any, values:any) => {
    console.log('Received values of form: ', values);
  });
}
return (
  <div className="login_div">
    <Form onSubmit={handleSearch}>
      <FormSate
        getFieldDecorator={getFieldDecorator}
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        formId="username"
        type="text"
        mustfill={true} 
        message="用户名不能为空"
        validator={validUser}
        placeholder="请输入用户名"
        hasFeedback={true}
        onBlur={(e: any) => $set({ username: e.target.value })}
      ></FormSate>
      <FormSate
        getFieldDecorator={getFieldDecorator}
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        formId="password"
        type="password"
        mustfill={true}
        message="密码不能为空"
        placeholder="请输入密码"
        hasFeedback={true}
        onBlur={(e: any) => $set({ password: e.target.value })}
      ></FormSate>
      <FormSate
        getFieldDecorator={getFieldDecorator}
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        formId="againpassword"
        type="password"
        mustfill={true}
        message="再次输入密码不能为空" 
        hasFeedback={true}
        placeholder="请再次输入密码"
        validator={validPassWord}
        onBlur={(e: any) => $set({ againpassword: e.target.value })}
      ></FormSate>
      <Button type="primary"
        htmlType="submit"
        onClick={doLogin}
        className="login-form-button"
        disabled={state.disabled}
      >
        登录
      </Button>
    </Form>
  </div>
)
}
export default Form.create()(formmart)