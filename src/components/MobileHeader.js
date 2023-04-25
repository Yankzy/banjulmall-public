import { MenuIcon, SearchIcon, ShoppingCartIcon, UserIcon, ChevronRightIcon, LocationMarkerIcon, XIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOverlay } from '../redux/overlaySlice';
import LeftSidebar from './LeftSidebar';
import { toggleLeftSidebar, toggleRighttSidebar } from '../redux/sidebarSlice';
import RightSidebar from './RightSidebar';

const MobileHeader = () => {
    const bottomMenu = ['Deals', 'Buy Again', 'Become A Seller', 'Customer Service', 'BM Business', 'Browse History']
    const userName = 'Yankz'
    const address = 'Kanifing Estate'
    const { leftSidebarIsVisible, rightSidebarIsVisible } = useSelector((store) => store.sidebar);
    const dispatch = useDispatch();
    return (
        <>
            <header className={`w-full z-40`}>
                {/* Top nav */}
                <div className='bg-amazon_blue py-2 text-white'>
                    {/* Left */}
                    <div className='flex'>
                        <div className='flex items-center justify-center h-8 mx-3 gap-2'>
                            <MenuIcon className='h-full' onClick={()=> dispatch(toggleLeftSidebar()) }/>
                            <p className='text-2xl font-extrabold'>BM</p>
                        </div>
                        
                        {/* Right */}
                        <div className='flex flex-grow justify-end text-xs mx-6 whitespace-nowrap'>
                            <div className='flex flex-row items-center' onClick={()=> dispatch(toggleRighttSidebar()) }>
                                <p className='flex text-xl items-end justify-center'>
                                    {(userName.length > 10) ? `${userName.slice(0, 10)}...` : userName} {" "}
                                    <ChevronRightIcon className='h-5 pb-2' />
                                </p> 
                                <UserIcon className='h-7' />
                            </div>
                            <div className='relative ml-4'>
                                <span className='cart-sum'>0</span>
                                <ShoppingCartIcon className='h-7' />
                            </div>
                        </div>
                    </div>
                    <div className='search mx-4'>
                        <input placeholder='Search Banjul Mall' className='input' type="text" />
                        <SearchIcon className="h-12 p-4" />
                    </div>
                    {/* Bottom nav */}
                    <div className='bottom-menu-container'>
                        {bottomMenu.map((item) => (
                            <p key={item} className='whitespace-nowrap'>
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
                <div className='flex flex-row bottom-menu-container bg-[#324254]'>
                    <LocationMarkerIcon className='h-5' />
                    <p className='ml-0'>{`Delivery to ${userName} - ${address}`}</p>
                </div>
            </header>
            {/* LeftMenu with sliding effect */}
            {leftSidebarIsVisible &&
                <>
                    <div 
                        className={`fixed top-0 left-0 h-full w-64 bg-gray-100 z-50 
                            transform transition-transform duration-500 ease-in-out 
                            ${leftSidebarIsVisible ? 'translate-x-0' : '-translate-x-full'}`}
                    >
                        <LeftSidebar />
                    </div>
                    <div
                        className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-40'
                        onClick={() => dispatch(toggleLeftSidebar())}
                    >
                        <XIcon className="close-sidebar" />
                    </div>
                </>
            }

            
            {/* RightMenu with sliding effect */}
            {rightSidebarIsVisible &&
                <>
                    <div 
                        className={`fixed top-0 right-0 h-full w-64 bg-gray-100 z-50
                        transform transition-transform duration-500 ease-in-out
                        ${rightSidebarIsVisible ? 'translate-x-0' : 'translate-x-full'}`}

                    >
                        <RightSidebar />
                    </div>
                    <div
                        className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-40'
                        onClick={() => dispatch(toggleRighttSidebar())}
                    >
                        <XIcon className="close-sidebar-right" />
                    </div>
                </>
            }
        </>
    )
}

export default MobileHeader