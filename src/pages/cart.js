import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { Form, Formik, Field } from 'formik';
import InputField from '../components/Fields';
import { v4 as uuid } from "uuid";
import crypto from 'crypto';

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
        <div className='relative h-full w-[75%] px-2 bg-white'>
          <h1 className='text-2xl'>Shopping Cart</h1>
          <div className='flex justify-between'>
            <p>Deselect all items</p>
            <p>Price</p>
          </div>
          <hr />

          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values }) => (
              <Form>
                <div className='flex flex-col'>
                    {items?.map((item, i) => (
                    <>
                      <div key={i} className='flex flex-row my-3 w-full justify-between'>
                        <div className='flex items-center'>
                          <Field type="checkbox" name={`selected.${item.id}`} className="mr-2" />
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={100}
                            height={100}
                            className='w-auto'
                          />
                          <div className='ml-2'>
                            <h1 className='text-lg font-medium'>{item.title}</h1>
                            <button className="text-blue-500 text-sm hover:underline">Delete</button>
                            <button className="text-blue-500 text-sm hover:underline ml-3">Save for later</button>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Field as="select" name={`quantity.${item.id}`} className="border border-gray-300 rounded-md mr-3">
                            {Array.from({ length: item.stock }, (_, i) => (
                              <option key={i} value={i + 1}>{i + 1}</option>
                            ))}
                          </Field>
                          <p className='text-xl font-extrabold my-auto'>{item.price}</p>
                        </div>
                      </div>
                      <hr />
                    </>
                    ))}

                  <div>
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
