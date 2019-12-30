import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, Button, Checkbox, Col, message } from 'antd';

const FormItem = Form.Item;

function formInput(props: any) {
	const {
		getFieldDecorator,
		placeholder,
		//默认值
		initialValue,
		//icon
		prefix,
		//输入框类型
		type,
		//表单唯一表示
		formId,
		//图形化
		hasFeedback,
		rules,
		//表单触发时间
		validateTrigger,

		className
	} = props
	return (
		<FormItem  hasFeedback={hasFeedback}>
			{getFieldDecorator(formId, {
				initialValue,
				rules,
				validateTrigger
			})(
				<Input placeholder={placeholder} className={className}  prefix={prefix} type={type} />
			)}
		</FormItem>
	)
}
export default formInput;