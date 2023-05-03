import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { Form, Formik, Field } from 'formik';
import { removeItem } from '../redux/cartSlice';


function CartPage() {
  const router = useRouter();
  const { slug } = router.query;

  const items = useSelector(({cart}) => cart.items);
  const dispatch = useDispatch();
  const totalPrice = items?.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

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


  return (
    <>
      <Head>
        <title>Cart | Banjul Mall</title>
      </Head>
      <Header />
      <div className='relative h-full w-full p-3 bg-gray-100'>
        <div className='relative h-full w-[75%] bg-white p-10 rounded-sm'>
          <h1 className='text-2xl'>Shopping Cart</h1>
          <div className='flex justify-between'>
            <p>Deselect all items</p>
            <p>Price</p>
          </div>
          <hr />

          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values }) => (
              <Form>
                <div className='flex flex-col p-5'>
                    {items?.map((item, i) => (
                    <>
                      <div key={i} className='flex flex-row my-3 w-full justify-between'>
                        <div className='flex items-center'>
                          <Field type="checkbox" name={`selected.${item.id}`} className="mr-2" />
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
                            <Field as="select" name={`quantity.${item.id}`} 
                              className="border border-gray-300 rounded-md mr-3 text-xs bg-gray-200 p-1 shadow-md"
                            >
                              {Array.from({ length: 5 }, (_, i) => (
                                <option key={`${item.id}-${i}`} value={i + 1}>Qty: {i + 1}</option>
                              ))}
                            </Field>
                            <button 
                              className="text-[#3c8f9f] text-sm hover:underline"
                              onClick={() => dispatch(removeItem(item.id))}
                            >
                              Delete
                            </button>
                            <span className='mx-2 text-gray-200'>|</span>
                            <button className="text-[#3c8f9f] text-sm hover:underline">Save for later</button>
                            
                          </div>
                        </div>
                        <div className="flex items-start">
                          <p className='text-xl font-extrabold top-0'>{item.price}</p>
                        </div>
                      </div>
                      <hr />
                    </>
                    ))}

                  <div className='flex items-center justify-end my-5'>
                    <p>{`Subtotal (${items?.length} items): ${totalPrice}`}</p>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

        </div>
      </div>
    </>
  );
}


export default CartPage;
