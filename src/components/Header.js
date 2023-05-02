import { useState, useEffect } from 'react';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';
import { UAParser } from "ua-parser-js";
import { useDispatch, useSelector } from 'react-redux';
import { localCart } from '../redux/cartSlice';

const Header = () =>{
  const [isMobile, setIsMobile] = useState(false);
  const items = useSelector(({cart}) => cart.items);
  const dispatch = useDispatch();


  useEffect(() => {
    const parser = new UAParser();
    const userAgent = window.navigator.userAgent;
    const result = parser.setUA(userAgent).getResult();
    const isMobileDevice = /mobile/i.test(result.device.type);
    setIsMobile(isMobileDevice);

    dispatch(localCart());
  }, []);

  return isMobile ? <MobileHeader /> : <DesktopHeader />
}

export default Header;
