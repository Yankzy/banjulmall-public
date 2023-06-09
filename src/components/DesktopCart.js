import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik, Field } from 'formik';
import { addItem, removeItem, cartTotal } from '../redux/cartSlice';
import styles from '../styles/cart.module.css';
import SimilarProducts from './SimilarProducts';
import SaveItems from './SaveItems';
import { addSavedItem } from '../redux/saveItemsSlice';
import Header from './Header';



function DesktopCart() {
  const router = useRouter();
  const { slug } = router.query;

  const items = useSelector(({cart}) => cart.items);
  const dispatch = useDispatch();
  const cartTotals = useSelector(({cart}) => cartTotal(cart.items));

  const onSubmit = async (values, actions) => {
    // Handle form submission logic here
    console.log(values);

    // Reset form after submission
    actions.resetForm();
  };

  // Generate initial values for Formik
  const initialValues = items?.reduce((acc, item) => {
    acc[item.id] = { quantity: 1 };
    return acc;
  }, {});


  const handleSaveForLater = (item) => {
    dispatch(addSavedItem({...item, quantity: 1}));
    dispatch(removeItem(item.id));
  };



  return (
    <>
      <Head>
        <title>Cart | Banjul Mall</title>
      </Head>
      <Header />
      <div className={`relative flex flex-col md:flex-row h-full w-full p-3 bg-gray-100 ${styles.bg_svg}`}>
        <div className='relative h-full md:w-[75%]'>
          <div className='bg-white p-10 rounded-md mb-5'>
            <h1 className='text-2xl'>Shopping Cart</h1>
            <div className='flex justify-between'>
              <p>Deselect all items</p>
              <p className='mr-2'>Price</p>
            </div>
            <hr />
            {items.length ? (
              <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ values }) => (
                  <Form>
                    <div className='flex flex-col p-5'>
                        {items?.map((item, i) => (
                        <>
                          <div key={`${item.id}_${i}`} className='flex flex-row my-3 w-full justify-between'>
                            <div className='flex items-center'>
                              {/* <Field type="checkbox" name={`selected.${item.id}`} className="mr-2" /> */}
                              <Image
                                src={item.image}
                                alt={item.title}
                                width={70}
                                height={70}
                                className='w-auto'
                              />
                              <div className='ml-2 min-h-[90%]'>
                                <h1 className='text-lg font-medium'>{item.title}</h1>
                                <p className='text-xs text-green-600 my-3'>In Stock</p>
                                <div className="relative">
                                    <div id="qtyLabel" className="absolute text-xs pt-[0.37rem] left-1">Qty:</div>
                                    <Field as="select" name={`quantity.${item.id}`} 
                                      className="border border-gray-300 rounded-md text-xs bg-gray-200 p-1 pl-8 shadow-md"
                                      onChange={e => dispatch(addItem({...item, quantity: Number(e.target.value)} ))}
                                      value={item.quantity}
                                      aria-labelledby="qtyLabel"
                                    >
                                      {Array.from({ length: 10 }, (_, i) => (
                                          <option key={`${item.id}-${i}`} value={i + 1}>{i + 1}</option>
                                      ))}
                                    </Field>
                                </div>

                                
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
                            <div className="flex items-start">
                              <p className='text-xl font-extrabold top-0'>{item.price}</p>
                            </div>
                          </div>
                          <hr />
                        </>
                        ))}

                      <div className='flex text-xl items-center justify-end my-5'>
                        <p >{`Subtotal (${cartTotals['totalQty']} items):`}</p>
                        <p className='text-xl font-bold ml-3'>{`  $${(cartTotals['totalPrice']).toFixed(2)}`}</p>
                      </div>
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
            
          </div>
          <SaveItems item={items.filter(item => item.saveForLater)} />
        </div>
        <div className='relative w-full md:w-[30%] mt-5 md:mt-0 md:ml-3'>
          <div className='bg-white p-10 rounded-md'>
            <div className='flex flex-col'>
              <div className='flex flex-row'>
                <p className='text-xl mb-5'>Subtotal ({cartTotals['totalQty']} items): </p>
                <p className='text-xl font-bold ml-3'>{`$${(cartTotals['totalPrice']).toFixed(2)}`}</p>
              </div>
              <button 
                className={`bg-${cartTotals['totalQty'] === 0 ? 'gray-400' : 'yellow-500'} text-white font-semibold px-6 py-2 rounded-md shadow-md`}
                disabled={cartTotals['totalQty'] === 0}
                onClick={() => router.push('/checkout')}
              >
                Continue to checkout
              </button>
            </div>
          </div>
          <SimilarProducts />
        </div>
      </div>
    </>
  );
}


export default DesktopCart;
