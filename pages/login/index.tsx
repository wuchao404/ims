import React,{useState, useEffect} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import FormSate from "../components/formItem";
import './index.less';
import axios from '../../utils/axios'
import {setToken} from '../../utils/frontend/storage';
import Router from 'next/router'
import routerMap from '../../router/routerMap';
import {loginApi} from '../../assets/api/login'
import { userName } from "../../assets/utils/utils";

// interface IForm {
//   title: string,
//   loginSta: boolean,
//   name?: string,
//   [key: string]: any
// }



 function formmart (props: any) {
  useEffect(() => {
    console.log(props)
  });
  const { getFieldDecorator } = props.form;
  const initState = {
    loading: false,
    username:'',
    password:''
  };
  const [state, setState] = useState(initState);

  // setState方法
  const $set = (curState: any) => {
    if (typeof curState !== 'object') return;
    setState(preState => ({...preState, ...curState}))
  };
  // 登录接口
  const doLogin = () => {
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
  const handleSubmit=(e:any) =>{
     
    e.preventDefault();
    props.form.validateFields((err:any, values:any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  function FormSateUser (props:any){
    const validFunction = (rule:any, val:any ,callback:any) => {
        if (!userName(val)) { // 正则验证
            callback('请输入正确的用户名'); // 校验未通过
        }
        callback(); // 校验通过
    }
    return(
      <FormSate 
      getFieldDecorator ={getFieldDecorator}
      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
      formId="username"
      type="text"
      validator={validFunction}
      placeholder="请输入用户名"
      ></FormSate>
    )
  }
  
  
  return (
    <div className="login_div">
      <FormSateUser  getFieldDecorator ={getFieldDecorator}></FormSateUser>

      
      {/* <Form onSubmit={handleSubmit} className="content_div">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, 
                      pattern: '^[a-zA-Z0-9]*$',
                      message: 'Please input your username!'
             }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='请输入账号'
              onBlur={e => $set({ username: e.target.value })}
            />,
          )}
        </Form.Item> */}
        {/* <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder='请输入密码'
              onBlur={e => $set({ password: e.target.value })}
            />,
          )}
        </Form.Item> */}
        {/* <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" 
                  htmlType="submit" 
                  onClick={doLogin} 
                  className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item> */}
      {/* </Form> */}
    </div>
   
  )
}
export default Form.create()(formmart)