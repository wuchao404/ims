import React, { useEffect, useState } from 'react';
import { Button, Input, notification, Icon, Form } from 'antd';
import { registerApi, checkUsernameApi } from '../../assets/api/login';
import './register.less';
import { jumpToLogin } from '../../router/redirect'
import { userName, phoneTest, phoneTestCode } from "../../assets/utils/pattern";

export const formRegister = (props: any) => {
  useEffect(() => {
    console.log(props)
  }, [])
  const { getFieldDecorator, validateFields, getFieldValue } = props.form;
  const FormItem = Form.Item;
  const initState = {
    loading: false,
    phoneDisable: true,//发送验证码按钮是否可点击
    checked: false,// 是否可以注册,
    timer: 10,
    btnText: "发送验证码"

  };
  const [state, setState] = useState(initState);

  // setState方法
  const $set = (curState: any) => {
    if (typeof curState !== 'object') return;
    setState(preState => ({ ...preState, ...curState }))
  };
  //检测两次输入密码是否一致
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
  // 注册接口
  const doRegister = () => {
    //判断表单验证
    validateFields((errors: any, values: any) => {
      if (errors) return false;
      //注册接口
      registerApi({
        username: values.userName,
        password: values.passWord,
      }).then(res => {
        if (res.data.status === 200) {
          notification.warn({ message: '提示', description: res.data.message, duration: 2 });
          jumpToLogin();
        }
      })
    })
  }
  //表单失去焦点验证
  const validUser = (rule: any, val: any, callback: any) => {
    if (val !== "") {
      if (!userName(val)) { // 正则验证
        callback('请输入正确的用户名'); // 校验未通过
        return
      }
      //通过验证时触发是否注册过用户
      doCheckUsername(val)
    }
    callback(); // 校验通过
  }
  // 检查用户名是否存在
  const doCheckUsername = (username: string) => {
    //通过校验时触发接口判断用户是否已经注册
    checkUsernameApi({ username }).then(res => {
      const isRegisted = res.data.data.isRegisted === 1;
      if (isRegisted) {
        notification.warn({ message: '提示', description: res.data.message, duration: 2 });
      }
      // $set({ checked: !isRegisted });// 未注册的用户才可通过验证
    })
  }
  //手机号验证
  const validPhone = (rule: any, val: any, callback: any) => {
    if (val !== "") {
      if (!phoneTest(val)) { // 正则验证
        callback('请输入正确的手机号'); // 校验未通过
        $set({ phoneDisable: true });
        return

      }
      $set({ phoneDisable: false });
    }
    callback(); // 校验通过
  }
  //倒计时
  const count = () => {
    let siv = setInterval(() => {
      $set({ timer: (state.timer--), btnText: state.timer, phoneDisable: true })
      if (state.timer === 0) {
        clearInterval(siv);
        $set({ btnText: '重新发送', phoneDisable: false })
        $set({ timer: 10 })
      }
      console.log(state.timer)
    }, 1000);

  }
  //发送验证码
  const verificationCode = () => {
    let phonecode = props.form.getFieldValue("phone")
    console.log(phonecode)
    //当发送验证码成功时
    count()

  }
  //校验验证码
  const validPhoneCode = (rule: any, val: any, callback: any) => {
    console.log(val)
    if (val !== "") {
      if (!phoneTestCode(val)) { // 正则验证
        callback('请输入正确的手机验证码'); // 校验未通过
        return
      }
    }
    callback(); // 校验通过
  }
  return (
    <div className='register_div'>
      <div className='content_div'>
        <Form>
          <img src='/images/register.jpeg' />
          <FormItem hasFeedback={true}>
            {getFieldDecorator('userName', {
              required: true,
              validateTrigger: 'onBlur',
              rules: [{
                required: false,
                message: "用户名不能为空"
              }, {
                validator: validUser
              }]
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
                required: false,
                message: "密码不能为空"
              }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入密码"
              />
            )}
          </FormItem>
          <FormItem hasFeedback={true}>
            {getFieldDecorator('againPassWord', {
              required: true,
              validateTrigger: 'onBlur',
              rules: [{
                required: false,
                message: "密码不能为空"
              }, {
                validator: validPassWord
              }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请再次输入密码"
              />
            )}
          </FormItem>
          <div className="phone-context">
            <FormItem hasFeedback={true}>
              {getFieldDecorator('phone', {
                required: true,
                validateTrigger: 'onBlur',
                rules: [{
                  required: false,
                  message: "手机号不能为空"
                }, {
                  validator: validPhone
                }]
              })(
                <Input
                  prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="text"
                  className="phone-text"
                  placeholder="请输入手机号"
                />
              )}
            </FormItem>
            <Button type="default"
              onClick={verificationCode}
              className="phone-button"
              disabled={state.phoneDisable}
            >
              {state.btnText}
            </Button>
          </div>
          <FormItem hasFeedback={true}>
            {getFieldDecorator('phoneCode', {
              required: true,
              validateTrigger: 'onBlur',
              rules: [{
                required: false,
                message: "手机验证码不能为空"
              }, {
                validator: validPhoneCode
              }
              ]
            })(
              <Input
                prefix={<Icon type="database" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="text"
                className="phone-text"
                placeholder="请输入手机验证码"
              />
            )}
          </FormItem>
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