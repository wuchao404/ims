import React, { useEffect, useState } from 'react';
import { Button, Input, notification, Icon, Form } from 'antd';
import FormInput from "../components/formInput";
import { registerApi, checkUsernameApi } from '../../assets/api/login';
import './register.less';
import { jumpToLogin } from '../../router/redirect'

export const formRegister = (props: any) => {
  useEffect(() => {
    console.log(props)
  }, [])
  const { getFieldDecorator, validateFields, getFieldValue } = props.form;
  const initState = {
    loading: false,
    checked: false,// 是否可以注册
  };
  const [state, setState] = useState(initState);
 
  const validPassWord = (rule: any, val: any, callback: any) => {
    if (val) {
      let loginpass = getFieldValue("passWord");
      if (loginpass && loginpass !== val) {
        callback(new Error('两次密码输入不一致'))
        return
      } else {
        callback();
      }
    }
  }

  // setState方法
  const $set = (curState: any) => {
    if (typeof curState !== 'object') return;
    setState(preState => ({ ...preState, ...curState }))
  };
  // 注册接口
  const doRegister = () => {
    //判断表单验证
    validateFields((errors: any, values: any) => {
      if (errors) return false;

      registerApi({
        username: values.userName,
        password: values.passWord
      }).then(res => {
        if (res.data.status === 200) {
          notification.warn({ message: '提示', description: res.data.message, duration: 2 });
          jumpToLogin();
        }
      })
    })
  }

  // 检查用户名是否存在
  const doCheckUsername = ( username: string) => {
    validateFields((errors: any, values: any) => {
      console.log(errors)
    })
      if (username) {
        checkUsernameApi({ username }).then(res => {
        
          const isRegisted = res.data.data.isRegisted === 1;
          if (isRegisted) {
            notification.warn({ message: '提示', description: res.data.message, duration: 2 });
          }
          // $set({ checked: !isRegisted });// 未注册的用户才可通过验证
        })
      }
  }
  return (
    <div className='login_div'>
      <div className='content_div'>

        <Form>
          <img src='/images/register.jpeg' />
          <FormInput
            getFieldDecorator={getFieldDecorator}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            formId="userName"
            type="text"
            placeholder="请输入用户名"
            hasFeedback={false}
            rules={[{
              required: false,
              message: "用户名不能为空"
            }]}
            onBlur={(e:any)=>{doCheckUsername(e.target.value)}}
          ></FormInput>
          <FormInput
            getFieldDecorator={getFieldDecorator}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            formId="passWord"
            type="password"
            placeholder="请输入密码"
            hasFeedback={false}
            rules={[{
              required: false,
              message: "密码不能为空"
            }]}
          ></FormInput>
          <FormInput
            getFieldDecorator={getFieldDecorator}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            formId="againPassWord"
            type="password"
            message="再次输入密码不能为空"
            hasFeedback={false}
            placeholder="请再次输入密码"
            rules={[{
              required: false,
              message: "密码不能为空"
            }, {
              validator: validPassWord
            }]}
          ></FormInput>
          <Button type="primary"
            onClick={doRegister}
            className="login-form-button"
            loading={false}
            disabled={false}
          >
            注册
      </Button>
        </Form>

      </div>
    </div>
  )
}
export default Form.create()(formRegister)