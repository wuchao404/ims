import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div style={{height: 60, background: 'red'}}>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
  </div>
);

export default Header;