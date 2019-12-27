import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, Button, Checkbox, Col, message } from 'antd';

const FormItem = Form.Item;

function formItems(props: any) {
	const {
		//表单绑定
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
		onBlur,
		rules
	} = props
	return (
		<FormItem  hasFeedback={hasFeedback}>
			{getFieldDecorator(formId, {
				initialValue,
				rules,
			})(
				<Input placeholder={placeholder} onBlur={onBlur}  prefix={prefix} type={type} />
			)}
		</FormItem>
	)
}
export default formItems;