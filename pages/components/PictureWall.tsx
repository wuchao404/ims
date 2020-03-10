import React,{useState} from 'react';
import {Upload,Modal, Icon, notification} from 'antd';
import {getToken} from '../../utils/frontend/storage';
import {deleteApi} from '../../assets/api/upload'

// 照片墙
const PictureWall = (props: any) => {
  const token: string = '';
  interface StateType {
    fileList:any[],
    [props: string]: any
  }
  const initState:StateType = {
    showNav:false,
    fileList:[],
    previewImage: '',
    previewVisible:false
  };
  const [state, setState] = useState(initState);

  // setState方法
  const $set = (curState: any) => {
    if (typeof curState !== 'object') return;
    setState(preState => ({...preState, ...curState}))
  };
  // 将图片转为base64
  const getBase64 = (file:any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  const handleCancel = () => $set({ previewVisible: false });

  const handlePreview = async (file:any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    $set({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  const handleChange = ({ fileList = [], file}:any) => {
    console.log('file: ', file);
    const {status = '',response = {}} = file;
    if (status === 'done') {
      const {status,data = {}} = response;
      const {id = '', url = ''} = data;
      if (status === 200) {
        file.uid = id;
        file.url = url;
      }
    }
    $set({ fileList:[...state.fileList, file] });
  };
  // 移除
  const handleRemove = (file: any) => {
    const {uid = ''} = file;
    deleteApi({id: uid}).then(res => {
      notification.success({ message:'提示', description:'删除成功', duration: 2})
    })
  }
  const uploadButton = (
    <div>
      <Icon type='plus'/>
      <div className="ant-upload-text">上传</div>
    </div>
  );
  return <div>
    <Upload
          action="/api/upload/up"
          listType="picture-card"
          headers={{ token }}
          fileList={state.fileList}
          data={{listId: '1000999222'}}
          onPreview={handlePreview}
          onChange={handleChange}
          onRemove={handleRemove}
        >
          {state.fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={state.previewVisible} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={state.previewImage} />
        </Modal>
  </div>
}
export default PictureWall;