import Image from 'next/image';
import { MenuIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline';

const Header = () => {
    const menuB = ['Todays Deals', 'Buy Again', 'Customer Service', 'BM Business', 'Browse History', 'Become A Seller']
  return (
    <header>
        {/* Top nav */}
        <div className='flex items-center bg-amazon_blue flex-grow py-2'>
            <div className='flex items-center flex-grow sm:flex-grow-0 menu-t'>
            <Image
                src="/bm.png"
                alt="amazon-logo"
                width={150}
                height={40}
                objectFit='contain'
                className='cursor-pointer'
            />
            </div>
            {/* Search */}
            <div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500'>
                <input placeholder='Search Banjul Mall' className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md px-4 focus:outline-none' type="text" />
                <SearchIcon className="h-12 p-4" />
            </div>
            {/* Right */}
            <div className='text-white flex items-center text-xs space-x-10 mx-6 whitespace-nowrap'>
                <div className='menu-t'>
                    <p>Hello Yankz</p>
                    <p className='font-extrabold md:text-sm'>Account & Lists</p>
                </div>

                <div className='menu-t'>
                    <p>Returns</p>
                    <p className='font-extrabold md:text-sm'>& Orders</p>
                </div>

                <div className='menu-t relative flex items-center'>
                    <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>0</span>
                    <ShoppingCartIcon className='h-8' />
                    <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Cart</p>
                </div>
            </div>
        </div>
        {/* Bottom nav */}
        <div className='flex items-center bg-amazon_blue-light text-white text-sm space-x-3 p-2 pl-6'>
            <p className='menu-b whitespace-nowrap flex items-center'>
                <MenuIcon className='h-6 mr-1' />
                All
            </p>
            {menuB.map((item, index) => (
                <p key={index} className={`menu-b whitespace-nowrap ${index < 6 ? 'hidden lg:block' : ''}`}>{item}</p>
            ))}
        </div>
    </header>
  )
}

export default Header