
import dynamic from 'next/dynamic';
import { useDeviceType } from '../hooks/DeviceType';


const DesktopHeader = dynamic(() => import('./DesktopHeader'))
const MobileHeader = dynamic(() => import('./MobileHeader'))

const Header = () =>{
  const isMobile = useDeviceType();
  return isMobile ? <MobileHeader /> : <DesktopHeader />
}

export default Header;
