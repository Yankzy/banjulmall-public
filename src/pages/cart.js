import MobileCart from '../components/MobileCart';
import DesktopCart from '../components/DesktopCart';
import { useSelector } from 'react-redux';



function CartPage() {
  const isMobile = useSelector(({mobile}) => mobile.isMobile);

  return isMobile ? <MobileCart /> : <DesktopCart />;
}


export default CartPage;
