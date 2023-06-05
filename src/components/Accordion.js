import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { checkoutData } from '../data';
import { Formik, Form, Field } from 'formik';
import { toggleModal } from '../redux/modalSlice';
import AddAddress from './AddAddress';
import { useDispatch, useSelector } from 'react-redux';
import OverlayComponents from './OverlayComponents';
import { ulid } from 'ulid';
import { updateAddress } from '../redux/userSlice';
import { useEffect } from 'react';
import Payment from './Payment';
import SetupIntentForCard from './SetupIntentForCard';
import AddCard from './AddCard';
import axios from 'axios';



const Accordion = () => {
	const [data, setData] = useState(checkoutData);
	const [expanded, setExpanded] = useState(null);
	const addresses = [
		{
			id: 1,
			fullName: 'Yankuba Ebrihima Jarranka Morow Kuyateh',
			streetAddress: 'No. 20, Presidential Highway',
			streetAddress2: 'Kanifing Municipality',
			city: 'Kanifing',
			region: 'Kanifing',
			country: 'The Gambia',
			lastUsed: '2023-01-14T23:05:56.385Z'
		},
	];

	const dispatch = useDispatch();
	
	useEffect(() => {
    dispatch(updateAddress({
      id: "01H0GJVDG9DR31SYJDH2G84E6E",
      fullName: 'Yankuba Ebrihima Jarranka Morow Kuyateh',
      streetAddress: 'No. 20, Presidential Highway',
      streetAddress2: 'Kanifing Municipality',
      city: 'Kanifing',
      region: 'Kanifing',
      country: 'The Gambia',
      lastUsed: '2023-01-14T23:05:56.385Z'
    }));
	}, [])
	
	const { addressModal, addCardModal } = useSelector(({ modal }) => modal);
	const address = useSelector(({ user }) => user.address);
	const sortedAddresses = [...address]?.sort((a, b) => Date.parse(b.lastUsed) - Date.parse(a.lastUsed));
	const onSubmit = async (values, actions) => {
		// Handle form submission logic here
		console.log(values);

		// Reset form after submission
		actions.resetForm();
	};

  const paymentMethods = [
    {
      id: 1,
      cash: 'Pay cash on delivery',
      lastUsed: '2023-01-14T23:05:56.385Z'
    },
    {
      id: 2,
      cardNumber: '4242 4242 4242 4242',
      lastUsed: '2023-01-14T23:05:56.385Z'
    },
  ];

	const initialValues = {
		fullName: '',
	  	streetAddress: '',
	  	streetAddress2: '',
	  	city: '',
		region: '',
		phone: '',
	  	country: 'The Gambia',
		id: ulid(),
		selectedAddress: sortedAddresses[0]?.id,
    paymentMethod: paymentMethods[0]?.id,
  };


	const headerInfor = (title) => {
  return (
    <header
      onClick={() => setExpanded(expanded !== title ? title : null)}
      className={`flex p-4 cursor-pointer justify-between w-full`}
    >
      <h4 className='text-lg  font-bold'>{title}</h4>
      <button className='text-lg'>
        {expanded === title ? <FaChevronUp /> : <FaChevronDown />}
      </button>
    </header>
  );
	};

  // useEffect(() => {
  //   axios.post('/api/stripe-assets/intents', { operation: 'payment_methods', customer_id: stripeId })
  //   .then(async({ data }) => {
  //     console.log(data);
  //     // map over the data array 
  //     const paymentMethods = data.paymentMethods.data.map((paymentMethod) => {
  //       return {
  //         id: paymentMethod.id,
  //         brand: paymentMethod.card.brand,
  //         last4: paymentMethod.card.last4,
  //       }
  //     })
    
  //   })
  
  //   return () => {
  //     second
  //   }
  // }, [third])
  
  


	return (
		<div className='flex flex-col justify-between w-full'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
      {({ values, setFieldValue }) => (
        <Form>
          <div>
            {headerInfor('1. Delivery Address')}
            <div className="flex flex-col border border-gray-200 rounded-lg shadow-sm w-[90%] mx-10">
              {expanded === '1. Delivery Address' && sortedAddresses?.map(({id, fullName, streetAddress, streetAddress2, city, region, country}) => (
              <>
                <div key={id}>
                  <div className={`flex flex-1 p-3 text-sm m-3 ${values.selectedAddress === id ? 'bg-[#FCF5EE] border rounded-lg shadow-sm' : ''}`}>
                    <Field 
                      type="radio" 
                      name="selectedAddress"
                      value={id} 
                      className='mr-2' 
                      onChange={(e) => {
                        setFieldValue("selectedAddress", id);
                      }}
                    />
                    <p>
                      <span className='font-semibold'>{fullName}</span>
                      <span>, {streetAddress}, {streetAddress2}, {city}, {region}, {country}. </span>
                      <span 
                        className='text-bm_teal-dark cursor-pointer hover:text-red-500 hover:underline'
                        
                      >Edit address</span>
                    </p>
                  </div>
                </div>
              </>
              ))}
              {expanded === '1. Delivery Address' && 
                <div className='flex flex-1 p-3 text-sm m-3'>
                  <FaPlus className='mr-2 text-gray-300 text-xl cursor-pointer' onClick={() => dispatch(toggleModal('addressModal'))}/>
                  <p className='text-bm_teal-dark hover:text-red-500 hover:underline cursor-pointer' onClick={() => dispatch(toggleModal('addressModal'))}> Add new address </p>
                </div>
              }
            </div>
          </div>

          {/* payment method */}
          <div id='kkjjj'>
            {headerInfor('2. Payment Method')}
            <div className="flex flex-col border border-gray-200 rounded-lg shadow-sm w-[90%] mx-10">
            {expanded === '2. Payment Method' && paymentMethods?.map(({id, cash, cardNumber,  }) => (
              <>
                <div key={id}>
                  <div className={`flex flex-1 p-3 text-sm m-3 ${values.paymentMethod === id ? 'bg-[#FCF5EE] border rounded-lg shadow-sm' : ''}`}>
                    <Field 
                      type="radio" 
                      name="paymentMethod"
                      value={id} 
                      className='mr-2' 
                      onChange={(e) => {
                        setFieldValue("paymentMethod", id);
                      }}
                    />
                    <p>
                      {cash && <span className='font-semibold'>{cash}</span>}
                      <span className='font-semibold'>{cardNumber}</span>
                    </p>
                  </div>
                </div>
              </>
              ))}
              {expanded === '2. Payment Method' && 
                <div className='flex flex-1 p-3 text-sm m-3'>
                  <FaPlus className='mr-2 text-gray-300 text-xl cursor-pointer' onClick={() => dispatch(toggleModal('addCardModal'))}/>
                  <p className='text-bm_teal-dark hover:text-red-500 hover:underline cursor-pointer' onClick={() => dispatch(toggleModal('addCardModal'))}> Add a payment method </p>
                </div>
              }
            </div>
          </div>
          
                
        </Form>
      )}
      </Formik>
				{addressModal && <OverlayComponents ComponentToRender={AddAddress} visible={addressModal} position="middle" />}
				{addCardModal && <OverlayComponents ComponentToRender={AddCard} visible={addCardModal} position="middle" />}
		</div>
	);

};

export default Accordion;
