import React from 'react';
import Link from 'next/link';

export default () => (
  <div>
    <Link href="/home"><a>跳转到主页</a></Link>
    <br />
    <Link href="/login"><a>登录页</a></Link>
  </div>
)