import React, { useEffect, useState } from 'react';
import { homeListApi } from '../../assets/api/home'
import { logoutApi } from '../../assets/api/login'
import { Button, Form, Input, Icon, Table,Popconfirm } from 'antd';
import { clearAllStorage } from '../../utils/frontend/storage';
import { jumpToLogin } from '../../router/redirect'
import { phoneTest } from "../../assets/utils/pattern";
import { useRouter } from 'next/router';
import "./index.less";
import Link from 'next/link'
export const user = (props: any) => {
  interface StateType {
    dataSource:any[],
    total: any,
    selectedRows:any,
    current:any
  }
  const initState:StateType = {
    dataSource:[
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: '删除'
        
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: '删除',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: '删除',
      },
      {
        key: '4',
        name: 'Joe Black',
        age: 32,
        address: '删除',
      },
      {
        key: '5',
        name: 'Joe Black',
        age: 32,
        address: '删除',
      },
      {
        key: '6',
        name: 'Joe Black',
        age: 32,
        address: '删除',
      },
      {
        key: '7',
        name: 'Joe Black',
        age: 32,
        address: '删除',
      },
      {
        key: '8',
        name: 'Joe Black',
        age: 32,
        address: '删除',
      },
      {
        key: '9',
        name: 'Joe Black',
        age: 32,
        address: '删除',
      },
      {
        key: '10',
        name: 'Joe Black',
        age: 32,
        address: '删除',
      },
      {
        key: '11',
        name: 'Joe Black',
        age: 32,
        address: '删除',
      }
    ],
    selectedRows:[],
    total:0,
    current:""
  };
  const columns:any[] = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      render: (text: any, record: any) =>(
        <div>
        <Button size="small" className="edit" type="primary" onClick={() => handlEdit(record)}>编辑</Button>
        <Popconfirm  okText="确定" cancelText="取消"  title="是否删除当前数据" onConfirm={() => handleDelete(record)}>
          
          <Button size="small" type="danger">删除</Button>
        </Popconfirm>
        </div>
      
      )
     
    }
  ];
  const [state, setState] = useState(initState);
  const FormItem = Form.Item
  const { getFieldDecorator ,getFieldValue} = props.form
  const Router =useRouter()
  // setState方法
  const $set = (curState: any) => {
    if (typeof curState !== 'object') return;
    setState(preState => ({ ...preState, ...curState }))
  };

  //单行编辑
  const handlEdit = (record: any)=>{
    //获取key 传递接口 刷新数据
    console.log(record.key)
    Router.push("/user/edit/"+record.key);
  }
  //单行删除
  const handleDelete = (record: any) => {
    //获取key 传递接口 刷新数据
    console.log(record.key)
    
  };
  //全选
  const rowSelection = {
    onChange: (selectedRowKeys:any, selectedRows:any) => {
      //将选中数据操作批量删除
      $set({selectedRows:selectedRows})
    }
  };
  //导出客户名单
  const customerList=()=>{

  }
  //分页取数据
  const changePage =(page:any)=> {
    console.log(page);
    $set({
      current: page,
    });
  };
  const paginations ={
     // 分页
     showSizeChanger:true ,
     showQuickJumper:true,
      current: state.current,
      total: state.total,
      onChange: changePage,
      showTotal: ((total:any) => {
        return `共 ${total} 条`;
      })
    
  }
  //批量删除
  const batchDeletion =()=>{
    console.log(state.selectedRows)
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
  //搜索
  const doSeach=()=>{
      console.log(getFieldValue("phone"))
    
  }
  

  return (
    <div className="userAdministrationer">
      <Form layout="inline" >
      <Button type="primary"
          onClick={() => {
            Router.push("/user/addCustomer");
          }}
          loading={false}
          icon="plus"
        >
          新增用户
        </Button>
        <Button type="primary"
          onClick={batchDeletion}
          loading={false}
          disabled={false}
          icon="ordered-list"
        >
          批量删除
        </Button>
        <Button type="primary"
          onClick={customerList}
          loading={false}
          icon="download"
        >
          导入客户名单
        </Button>
        <FormItem >
          {getFieldDecorator('phone', {
            rules: [
              {
                required: false,
                message: '请输入正确的手机号'
              }, {
                validator: validPhone
              }
            ],
          })(
            <Input
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入用户手机号"
            />,
          )}

        </FormItem>
        <Button type="primary"
          onClick={doSeach}
          loading={false}
          disabled={false}
          icon="search"
        >
          搜索
        </Button>
      </Form>
      <Table className="table"
         pagination={paginations}
         size={"small"} bordered rowSelection={rowSelection} columns={columns} dataSource={state.dataSource} />
    </div >
  )
}
export default Form.create()(user)