import React from 'react';
import App from 'next/app';
import '../assets/style.less';

// 重写_app.js,详情查看 https://nextjs.org/docs#custom-app
export default (props: any) => {
  const { Component, pageProps } = props;
  return <Component {...pageProps} />
}