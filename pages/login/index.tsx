import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import FormInput from "../components/formInput";
import './index.less';
import axios from '../../utils/axios'
import { setToken } from '../../utils/frontend/storage';
import Router from 'next/router'
import routerMap from '../../router/routerMap';
import { loginApi } from '../../assets/api/login'
import { userName } from "../../assets/utils/pattern";

function formMart(props: any) {
  const { getFieldDecorator, validateFields } = props.form;
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
  const validPassWord = (rule: any, val: any, callback: any) => {
    let loginpass = props.form.getFieldValue('password');
    if (val && val !== '' && loginpass && loginpass !== val) {
      callback(new Error('两次密码输入不一致'))
      return
    } else {
      callback();
    }
  }
  //判断表单是否为空
  const fieldsValue = props.form.getFieldsValue()
  const disabled = Object.keys(fieldsValue).filter((v: any) => fieldsValue[v] !== '' && fieldsValue[v] !== undefined)

  return (
    <div className="login_div">
      <Form>
        <FormInput
          getFieldDecorator={getFieldDecorator}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          formId="userName"
          type="text"
          placeholder="请输入用户名"
          hasFeedback={true}
          rules={[{
            required: true,
            message: "密码不能为空"
          }, {
            validator: validUser
          }]}
        ></FormInput>
        <FormInput
          getFieldDecorator={getFieldDecorator}
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          formId="passWord"
          type="password"
          placeholder="请输入密码"
          hasFeedback={true}
          rules={[{
            required: true,
            message: "密码不能为空"
          }, {
            validator: validUser
          }]}
        ></FormInput>
        <FormInput
          getFieldDecorator={getFieldDecorator}
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          formId="againPassWord"
          type="password"
          message="再次输入密码不能为空"
          hasFeedback={true}
          placeholder="请再次输入密码"
          rules={[{
            required: true,
            message: "密码不能为空"
          }, {
            validator: validPassWord
          }]}
        ></FormInput>
        <Button type="primary"
          onClick={doLogin}
          className="login-form-button"
          disabled={!disabled.length}
        >
          登录
      </Button>
      </Form>
    </div>
  )
}
export default Form.create()(formMart)