import { useDispatch, useSelector } from 'react-redux';
import { toggleLeftSidebar, toggleRightSidebar } from '../redux/modalSlice';
import { TfiLocationPin, TfiAlignJustify, TfiSearch, TfiUser, TfiAngleRight } from "react-icons/tfi";
import { useRouter } from 'next/router';
import OverlayComponents from './OverlayComponents';
import { RiShoppingBasketLine } from 'react-icons/ri';

const MobileHeader = () => {
    
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

    console.log(items);


    return (
        <>
            <header id='mobileheader' className={`w-full z-40`}>
                {/* Top nav */}
                <div className='bg-amazon_blue py-2 text-white'>
                    {/* Left */}
                    <div className='flex'>
                        <div className='flex items-center justify-center h-8 mx-3 gap-2'>
                            <TfiAlignJustify size={20} className='h-full mx-3' onClick={()=> dispatch(toggleLeftSidebar()) }/>
                            <p 
                                onClick={()=> router.push('/') }
                                className='text-2xl font-extrabold cursor-pointer'>
                                BM
                            </p>
                        </div>
                        
                        {/* Right */}
                        <div className='flex flex-grow justify-end text-xs mx-6 whitespace-nowrap'>
                            <div className='flex flex-row items-center' onClick={LoginOrRightSidebarToggle}>
                                <p className='flex text-xl items-end justify-center'>
                                    {`${userName 
                                    ? ((userName.length > 10) ? `${userName.slice(0, 10)}...` : userName)
                                    : "sign in"}`}
                                    <TfiAngleRight className='h-5 pb-2' />
                                </p>
                                <TfiUser size={20} className='h-7' />
                            </div>
                            <div className='relative ml-4' onClick={()=>router.push('/cart')}>
                                {(items?.length > 0) && <span className='cart-sum'>{items?.length}</span>}
                                <RiShoppingBasketLine size={30} className='h-7' />
                            </div>
                        </div>
                    </div>
                    <div className='search mx-4'>
                        <input placeholder='Search Banjul Mall' className='input' type="text" />
                        <span className="p-4" ><TfiSearch size={20} color='black' /></span>
                    </div>
                    {/* Bottom nav */}
                    <div className='bottom-menu-container'>
                        {menuB.map((item) => (
                            <p key={item} className='whitespace-nowrap'>
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
                <div className='flex flex-row bottom-menu-container bg-[#324254]'>
                    <TfiLocationPin size={20} className='h-5' />
                    <p className='ml-0'>{`Delivery to ${userName || null} - ${address || null}`}</p>
                </div>
            </header>
            {(leftSidebarIsVisible || rightSidebarIsVisible ) && <OverlayComponents />}
        </>
    )
}

export default MobileHeader