import Link from 'next/link';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import './style/header.less';
const linkStyle = {
  marginRight: 15
};

const Header = () => (

  <div className="header_div"  >
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>List</Breadcrumb.Item>
      <Breadcrumb.Item>App</Breadcrumb.Item>
    </Breadcrumb>
    {/* <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link> */}
  </div>
);

export default Header;