import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, Button, Checkbox, Col, message } from 'antd';

const FormItem = Form.Item;

function formItems(props: any) {
	useEffect(() => {
		console.log(props)
		
	},[])
	const {
		//表单绑定
		getFieldDecorator,
		placeholder,
		//默认值
		initialValue,
		//是否必填
		mustfill,
		//icon
		prefix,
		//输入框类型
		type,
		//表单唯一表示
		formId,
		message,
		validator,
		onBlur,
		//图形化
		hasFeedback,
		label
	} = props
	return (
		<FormItem  hasFeedback={hasFeedback}>
			{getFieldDecorator(formId, {
				initialValue: initialValue,
				rules: [{
					required: mustfill,
					message: message
				}, {
					validator:validator
				}],
			})(
				<Input placeholder={placeholder} onBlur={onBlur} prefix={prefix} type={type} />
			)}
		</FormItem>
	)
}
export default formItems;