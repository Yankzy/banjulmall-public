import Image from 'next/image';
import { LocationMarkerIcon, MenuIcon, SearchIcon, ShoppingCartIcon, XIcon } from '@heroicons/react/outline';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLeftSidebar, toggleRighttSidebar } from '../redux/sidebarSlice';

const DesktopHeader = () => {

    const menuB = ['Deals', 'Buy Again', 'Become A Seller', 'Customer Service', 'BM Business', 'Browse History']
    const userName = 'Yankuba Kuyateh'
    const address = 'Kanifing Estate'
    const { leftSidebarIsVisible, rightSidebarIsVisible } = useSelector((store) => store.sidebar);
    const dispatch = useDispatch();


    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-40`}>
                {/* Top nav */}
                <div className='flex flex-row items-center bg-amazon_blue flex-grow py-1 gap-2 pl-6'>
                    <div className='flex items-center flex-grow-0 menu-t'>
                        <p className='text-white text-2xl font-extrabold'>BM</p>
                    </div>
                    <div className="text-white">
                        <LocationMarkerIcon className="h-7" />
                    </div>
                    <div className="flex-col left-0 text-white text-xs mr-2">
                        <p>Delivery to {(userName.length > 10) ? `${userName.slice(0, 10)}...` : userName}</p>
                        <p>{(address.length > 20) ? `${address.slice(0, 20)}...` : address}</p>
                    </div>


                    {/* Search */}
                    <div className='search'>
                        <input placeholder='Search Banjul Mall' className='input' type="text" />
                        <SearchIcon className="h-12 p-4" />
                    </div>
                    {/* Right */}
                    <div className='text-white flex items-center text-xs space-x-10 mx-6 whitespace-nowrap'>
                        <div className='menu-t' onClick={()=> dispatch(toggleRighttSidebar()) }>
                            <p>Hello {(userName.length > 10) ? `${userName.slice(0, 10)}...` : userName} {" "}</p>
                            <p className='font-extrabold'>Account & Lists</p>
                        </div>

                        <div className='menu-t'>
                            <p>Returns</p>
                            <p className='font-extrabold'>& Orders</p>
                        </div>

                        <div className='menu-t relative flex items-center'>
                            <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>0</span>
                            <ShoppingCartIcon className='h-8' />
                            <p className='font-extrabold mt-2'>Cart</p>
                        </div>
                    </div>
                </div>
                {/* Bottom nav */}
                <div className='flex items-center bg-amazon_blue-light text-white text-sm space-x-3 py-2 pl-6'>
                    <p className='menu-b whitespace-nowrap flex items-center cursor-pointer' onClick={()=> dispatch(toggleLeftSidebar()) }>
                        <MenuIcon className='h-6 mr-1' />
                        All
                    </p>
                    {menuB.map((item, index) => (
                        <p key={index} className={`menu-b whitespace-nowrap ${index < 6 ? 'hidden lg:block' : ''}`}>{item}</p>
                    ))}
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

export default DesktopHeader;
