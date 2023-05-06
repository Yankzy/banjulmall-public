import { useState, useEffect } from 'react';
import { UAParser } from "ua-parser-js";
import { useDispatch } from 'react-redux';
import { localCart } from '../redux/cartSlice';
import dynamic from 'next/dynamic';
import { changeMobileStatus } from '../redux/mobileSlice';


const DesktopHeader = dynamic(() => import('./DesktopHeader'))
const MobileHeader = dynamic(() => import('./MobileHeader'))

const Header = () =>{
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const parser = new UAParser();
    const userAgent = window.navigator.userAgent;
    const result = parser.setUA(userAgent).getResult();
    const isMobileDevice = /mobile/i.test(result.device.type);
    setIsMobile(isMobileDevice);
    dispatch(changeMobileStatus(isMobileDevice));
    dispatch(localCart());
    localStorage.removeItem("cart")
  }, []);

  return isMobile ? <MobileHeader /> : <DesktopHeader />
}

export default Header;
