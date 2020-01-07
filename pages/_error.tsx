
import React from 'react';

const Error = (props: any) => {
  const {statusCode} = props;
  return (
    <p>
      {statusCode
        ? `服务端错误，statusCode= ${statusCode} `
        : '客户端错误'}
    </p>
  )
}

export default Error