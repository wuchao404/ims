  /**
   * 在tree中查找
   * @param arr     树
   * @param keyName key
   * @param value   查找内容
   */  
  export const findObject = (arr: any[], keyName: string, value: string):any => {
    let obj = {};
    const _find = (children: any[]) => {
      children.find((item: any) => {
        if (item[keyName] === value) {
          obj = item;
          return item[keyName] === value;
        }else if (item.children && item.children.length){
          _find(item.children);
        }
      })
    }
    _find(arr);
    return obj;
  }