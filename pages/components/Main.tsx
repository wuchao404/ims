import React from 'react';
import Navigation from './Navigation';
import Header from './Header';
import './style/main.less'

const Main = (props: any) => {
  const {
    children,
  } = props;
  return (
    <div className='main_div'>
      <Navigation />
      <div className='right_div'>
        <Header />
        <div className='container_div'>{ children }</div>
      </div>
    </div>
  )
}

export default Main;