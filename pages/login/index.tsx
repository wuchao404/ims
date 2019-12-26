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
  },[]);
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
  const validFunction = (rule:any, val:any ,callback:any) => {
            if (!userName(val)) { // 正则验证
                callback('请输入正确的用户名'); // 校验未通过
            }
            callback(); // 校验通过
        }
        return(
          <div className="login_div">
          <FormSate 
          getFieldDecorator ={getFieldDecorator}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          formId="username"
          type="text"
          validator={validFunction}
          placeholder="请输入用户名"
          ></FormSate>
          </div>
        )
}
export default Form.create()(formmart)