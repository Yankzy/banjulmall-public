import { useSelector, useDispatch } from 'react-redux';
import { toggleLeftSidebar, toggleRightSidebar } from '../redux/modalSlice';
import { useRouter } from 'next/router';
import { TfiLocationPin, TfiAlignJustify, TfiSearch, TfiShoppingCart } from "react-icons/tfi";
import OverlayComponents from './OverlayComponents';

const DesktopHeader = () => {

    const router = useRouter();
    const menuB = ['Deals', 'Buy Again', 'Become A Seller', 'Customer Service', 'BM Business', 'Browse History']
    const { leftSidebarIsVisible, rightSidebarIsVisible } = useSelector(({modal}) => modal);
    const currentUser = useSelector(({user}) => user.currentUser);
    const items = useSelector(({cart}) => cart.items);
    const dispatch = useDispatch();

    const userName = currentUser?.displayName?.split(' ')[0]
    const address = "Kanifing Estate"
    
    const LoginOrRightSidebarToggle = () => {
        if (currentUser) {
            dispatch(toggleRightSidebar());
        } else {
            router.push('/login');
        }
    }

    return (
        <>
            <header id='desktopheader' className={`w-full z-40`}>
                {/* Top nav */}
                <div className='flex flex-row items-center bg-amazon_blue flex-grow py-1 gap-2 pl-6'>
                    <div className='flex items-center flex-grow-0 menu-t'>
                        <p 
                            onClick={()=> router.push('/') }
                            className='text-white text-2xl font-extrabold cursor-pointer'
                        >
                            BM
                        </p>
                    </div>
                    {userName &&
                        <>
                            <div className="text-white">
                                <TfiLocationPin size={20} />
                            </div>
                            <div className="flex-col left-0 text-white text-xs mr-2">
                                <p>Delivery to {(userName?.length > 10) ? `${userName?.slice(0, 10)}...` : userName}</p>
                                <p>{(address?.length > 20) ? `${address?.slice(0, 20)}...` : address}</p>
                            </div>
                        </>
                    }


                    {/* Search */}
                    <div className='search'>
                        <input placeholder='Search Banjul Mall' className='input' type="text" />
                        <span className="p-4" ><TfiSearch size={20} /></span>
                        
                    </div>
                    {/* Right */}
                    <div className='text-white flex items-center text-xs space-x-10 mx-6 whitespace-nowrap'>
                        <div className='menu-t' onClick={LoginOrRightSidebarToggle}>
                            <p>{`Hello, ${userName 
                                ? ((userName.length > 10) ? `${userName.slice(0, 10)}...` : userName)
                                : "sign in"}`}
                            </p>
                            <p className='font-extrabold'>Account & Lists</p>
                        </div>

                        <div className='menu-t'>
                            <p>Returns</p>
                            <p className='font-extrabold'>& Orders</p>
                        </div>
                        <div className='menu-t relative flex items-center' onClick={()=>router.push('/cart')}>
                            {items?.length > 0 && (
                                <span className='absolute top-0 right-11 h-5 w-5 bg-yellow-400 text-center rounded-full text-black font-bold justify-center'>
                                    {items?.length}
                                </span>
                            )}
                            <TfiShoppingCart size={25} />
                            <p className='font-extrabold mt-2'>Cart</p>
                        </div>
                    </div>
                </div>
                {/* Bottom nav */}
                <div className='flex items-center bg-amazon_blue-light text-white text-sm space-x-3 py-2 pl-6'>
                    <p className='menu-b whitespace-nowrap flex items-center cursor-pointer' onClick={()=> dispatch(toggleLeftSidebar()) }>
                        <TfiAlignJustify size={20} className='h-6 mr-1' />
                        All
                    </p>
                    {menuB.map((item, index) => (
                        <p key={index} className={`menu-b whitespace-nowrap`}>{item}</p>
                    ))}
                </div>
            </header>
            {(leftSidebarIsVisible || rightSidebarIsVisible ) && <OverlayComponents />}
            

        </>
    )
}

export default DesktopHeader;
