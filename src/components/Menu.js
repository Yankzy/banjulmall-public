import { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const LeftMenu = ({ visible }) => {

  // className="bg-gray-100 h-screen" 

  return (
    <nav className={`sidebar fixed top-0 left-0 h-full w-64 bg-gray-200 p-4 transition-all duration-300 ${
      visible ? 'transform translate-x-0' : 'transform -translate-x-full'
  }`}>
      <p>Hello</p>
      <XIcon className='h-12'/>
    </nav>
  );
}

export default LeftMenu;
