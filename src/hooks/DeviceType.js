import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import UAParser from 'ua-parser-js';
import { localCart } from '../redux/cartSlice';
import { changeMobileStatus } from '../redux/mobileSlice'; 

export const useDeviceType = () => {
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
    // localStorage.removeItem("cart")
  }, []);

  return isMobile;
};
