import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik, Field } from 'formik';
import { addItem, removeItem } from '../redux/cartSlice';
import styles from '../styles/cart.module.css';
import SimilarProducts from './SimilarProducts';
import SaveItems from './SaveItems';
import { addSavedItem } from '../redux/saveItemsSlice';
import Header from './Header';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';



function MobileCart() {
  const router = useRouter();
  const { slug } = router.query;

  const items = useSelector(({cart}) => cart.items);
  const dispatch = useDispatch();


  const onSubmit = async (values, actions) => {
    // Handle form submission logic here
    console.log(values);

    // Reset form after submission
    actions.resetForm();
  };

  // Generate initial values for Formik
  // const initialValues = items?.reduce((acc, item) => {
  //   acc[item.id] = { quantity: 1 };
  //   return acc;
  // }, {});

  // cartTotals = { totalPrice, totalQty } using reduce on items
  const cartTotals = items?.reduce((acc, item) => {
      acc.totalPrice += item.price * item.quantity;
      acc.totalQty += item.quantity;
      return acc;
    },
    { totalPrice: 0, totalQty: 0 }
  );

  const handleSaveForLater = (item) => {
    dispatch(addSavedItem({...item, quantity: 1}));
    dispatch(removeItem(item.id));
  };

  const handleQuantityChange = (item) => {
    item.quantity === 0 ? dispatch(removeItem(item.id)) : dispatch(addItem(item));
  };




  return (
    <>
      <Head>
        <title>Cart | Banjul Mall</title>
      </Head>
      <Header />
      <div className={`relative flex flex-col h-full w-full p-3 bg-white`}>
        <div className='flex flex-col'>
          <div className='flex flex-row'>
            <p className='text-xl mb-5'>Subtotal ({cartTotals['totalQty']} items): </p>
            <p className='text-xl font-bold ml-3'>{`$${(cartTotals['totalPrice']).toFixed(2)}`}</p>
          </div>
          <button 
            className={`bg-${cartTotals['totalQty'] === 0 ? 'gray-400' : 'yellow-500'} text-white font-semibold px-6 py-2 rounded-md bg-gr`}
            disabled={cartTotals['totalQty'] === 0}
          >
            Continue to checkout
          </button>
        </div>
        <hr className=' my-5' />
        {items.length ? (
          <Formik initialValues={{}} onSubmit={onSubmit}>
            {({ values }) => (
              <Form>
                <div className='flex flex-col px-1'>
                    {items?.map((item, i) => (
                    <>
                      <div key={`${item.id}_${i}`} className='flex flex-row my-3 w-full justify-between'>
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={70}
                          height={70}
                          className='w-auto'
                        />
                        <div className='flex flex-col items-center justify-end'>
                          <div className='ml-2'>
                            <p>{item.title}</p>
                            <div className='flex flex-1'>
                              <span>$</span>
                              <p className='text-xl font-bold'>{item.price}</p>
                            </div>
                            <p className='text-xs text-green-600 my-3'>In Stock</p>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-row items-center'>
                        <div className='flex flex-row items-center border-2 rounded-md w-auto mb-3 bg-white mr-4'>
                          <button
                            className='border-2 bg-gray-200 font-bold px-2 py-1 mr-2'
                          >
                            {item.quantity === 1 
                              ? <FaTrash onClick={()=>dispatch(removeItem(item.id))} /> 
                              : <FaMinus onClick={()=>dispatch(addItem({id:item.id, quantity: item.quantity - 1 }))} />}
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className='border-2 bg-gray-200 font-bold px-3 py-1 ml-2'
                          >
                            {<FaPlus onClick={()=>dispatch(addItem({...item, quantity: item.quantity + 1 }))} />}
                          </button>
                        </div>
                        <div className='items-center justify-center pb-3'>
                          <button 
                            className="text-[#3c8f9f] text-sm hover:underline"
                            onClick={() => dispatch(removeItem(item.id))}
                          >
                            Delete
                          </button>
                          <span className='mx-2 text-gray-200'>|</span>
                          <button 
                            className="text-[#3c8f9f] text-sm hover:underline"
                            onClick={() => handleSaveForLater(item)}
                          >
                            Save for later
                          </button>
                        </div>
                      </div>
                      <hr />
                    </>
                    ))}
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div className='flex flex-col items-center justify-center h-full'>
            <p className='text-xl'>Your cart is empty</p>
            <button 
              className='bg-yellow-500 text-white font-semibold px-6 py-2 rounded-md mt-5'
              onClick={() => router.push('/')}
            >
              Continue shopping
            </button>
          </div>
        )}
        <div className='relative h-full py-10'>
          <div className='bg-white p-10 rounded-md mb-5'>
            
          </div>
          <SaveItems item={items.filter(item => item.saveForLater)} />
        </div>
        
      </div>
    </>
  );
}


export default MobileCart;
