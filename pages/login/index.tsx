import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.less';
import axios from '../../utils/axios'
import { setToken } from '../../utils/frontend/storage';
import Router from 'next/router'
import routerMap from '../../router/routerMap';
import { loginApi } from '../../assets/api/login'
import { userName } from "../../assets/utils/pattern";

const formLogin = (props: any) => {
  const { getFieldDecorator, validateFields } = props.form;
  const FormItem = Form.Item;
  // 登录接口
  const doLogin = () => {
    //判断表单验证
    validateFields((errors: any, values: any) => {
      if (errors) return false;
      //从表单中取值
      loginApi({
        username: values.userName,
        password: values.passWord
      }).then(res => {
        if (res.data.status === 200) {
          setToken(res.data.data.token);
          Router.replace(routerMap.home.pathname);
        }
      })
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
  //判断表单是否为空
  const fieldsValue = props.form.getFieldsValue()
  const disabled = Object.keys(fieldsValue).filter((v: any) => fieldsValue[v] !== '' && fieldsValue[v] !== undefined)

  return (
    <div className="login_div">
      <Form>
        <img src="/images/login.jpg" />
        <FormItem hasFeedback={true}>
          {getFieldDecorator('userName', {
            required: true,
            validateTrigger: 'onBlur',
            rules: [{
              message: "密码不能为空"
            }, {
              validator: validUser
            }],

          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text"
              placeholder="请输入用户名"
            />
          )}
        </FormItem>
        <FormItem hasFeedback={true}>
          {getFieldDecorator('passWord', {
            required: true,
            validateTrigger: 'onBlur',
            rules: [{
              required: true,
              message: "密码不能为空"
            }, {
              validator: validUser
            }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
            />
          )}
        </FormItem>
        <Button type="primary"
          onClick={doLogin}
          className="login-form-button"
          disabled={!disabled.length}
        >
          登录
      </Button>
        <p className="register">
          <a href="/login/register">立即注册</a>
        </p>
      </Form>
    </div>
  )
}
export default Form.create()(formLogin)