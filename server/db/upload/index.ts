import {ImageModal} from '../../modal/image/imageModal';

// 插入图片信息
export const insertImg = ({fileName = '', url = '',dirId = '', diskPath = ''}): Promise<ImageModal> => {
  return ImageModal.create({url, dirId, alt: fileName, diskPath})
}

// 查询当前文件夹下的所有图片
export const queryByDirId = (dirId = ''): Promise<ImageModal[]> => {
  return ImageModal.findAll({ where: {dirId}});
}

// 查询某个图片
export const querySingleImage = (id = ''): Promise<ImageModal> => {
  return ImageModal.findOne({ where: {id} });
}
// 删除一条记录
export const deleteSingleImage = (id =''): Promise<number> => {
  return ImageModal.destroy({ where: {id} });
}


