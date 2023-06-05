
import { useDispatch, useSelector } from 'react-redux';
import Accordion from '../components/Accordion';
import { useRouter } from 'next/router';
import { FaLock } from 'react-icons/fa';
import { useDeviceType } from '../hooks/DeviceType';
import { useState } from 'react';
import { cartTotal } from '../redux/cartSlice';


const Checkout = () => {
  const dispatch = useDispatch();
  const items = useSelector(({cart}) => cart.items);
  const cartTotals = useSelector(({cart}) => cartTotal(cart.items));
  const router = useRouter();
  const isMobile = useDeviceType();
  const [paymentMethod, setPaymentMethod] = useState(null)

  const paymentMethodChangeEvent = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full bg-white px-5">
      {/* checkout header */}
      <div className="relative flex flex-row justify-between items-center w-full h-20 bg-[ededed] shadow-sm overflow-visible">
          <div className='absolute w-full h-full bg-gradient-to-b from-transparent to-gray-100 bottom-0 z-20'/>
          <p 
            onClick={()=> router.push('/') }
            className='text-4xl font-extrabold cursor-pointer ml-52 z-30 text-[#3c8f9f]'
            style={{
              background: 'linear-gradient(to right, #75BDC7, #3C8F9F, #23666F)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            BM
          </p>
          <p className='text-2xl cursor-pointer z-20'>
            Checkout (
            <span onClick={()=> router.push('/cart')} className=' text-bm_teal-light cursor-pointer hover:underline'>
              {cartTotals['totalQty']} items
            </span>)
          </p>
              
          <FaLock 
            size={20} 
            className='h-6 mr-52 cursor-pointer z-20 text-bm_teal-dark' 
            onClick={()=> router.push('/cart')}
          />
      </div>

      {/* checkout body */}
      <div className='relative flex flex-row w-full items-start justify-between px-52 py-5'>
        <div className='flex flex-col w-[70%]'>
          <Accordion />
        </div>
        <div className='flex flex-col w-[30%] border rounded-md border-gray-300 top-0 shadow-md'>
          <p 
            className=' text-xs items-center justify-center py-3 mx-3 leading-normal'
          >
            By placing your order, you agree to Banjul Mall's
            <span className='text-bm_teal-dark cursor-pointer'> privacy notice </span>
              and
              <span className='text-bm_teal-dark cursor-pointer'> conditions of use</span>.
          </p>
          <hr />
          <div className='flex flex-col m-3'>
            <p className='text-md font-semibold'>Order Summary</p>
            <div className='flex flex-row justify-between items-start w-full mb-4'>
              <div className='flex flex-col justify-start items-start w-full'>
                <p className='text-xs mb-2'>Items ({cartTotals['totalQty']})</p>
                <p className='text-xs mb-2'>Delivery</p>
                <p className='text-xs mb-2'>VAT</p>
              </div>
              <div className='flex flex-col justify-end items-end w-full text-right'>
                <p className='text-xs mb-2'>{`$${(cartTotals['totalPrice']).toFixed(2)}`}</p>
                <p className='text-xs mb-2'>Free</p>
                <p className='text-xs mb-2'>${(cartTotals['totalPrice'] * 0.15).toFixed(2)}</p>
              </div>
            </div>
            <hr />
            <div className='flex flex-col'>
              <div className='flex flex-row justify-between items-center w-full mt-2 text-lg font-bold text-red-800'>
                <p>Order total</p>
                <p className='text-right'>
                  ${(cartTotals['totalPrice'] * 1.15).toFixed(2)}
                </p>
              </div>
              {/* <button className='bg-yellow-300 border border-yellow-100 rounded-md p-1 text-sm md:mx-3 mt-2'>Place your order</button> */}
            </div>
          </div>
          <div className=' bg-[#F0F2F2] text-xs p-4 border border-t-2 leading-normal'>
            <p>
              You can track your order and view any applicable fees before placing your order.
              <span className='text-bm_teal-dark cursor-pointer'> Learn more </span>
            </p>
            <p className='text-bm_teal-dark cursor-pointer'>How are transport costs calculated?</p>
          </div>
        </div>

          
      </div>
    </div>
  );
}

export default Checkout;
