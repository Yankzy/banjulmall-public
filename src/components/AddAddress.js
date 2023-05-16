import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/Fields';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, updateAddress } from '../redux/userSlice';
import { useRouter } from 'next/router';
import { FaTimes } from 'react-icons/fa';
import { toggleAddressModal } from '../redux/modalSlice';
import { ulid } from 'ulid'



const AddAddress = ({ title, }) => {
    const initialValues = {
	    fullName: '',
		streetAddress: '',
		streetAddress2: '',
		city: '',
        region: '',
        phone: '',
		country: 'The Gambia',
        id: ulid(),
	};


  const dispatch = useDispatch();
  const loading = useSelector(({user}) => user.loading);
  const router = useRouter();

  const onSubmit = async(values, actions) => {
    dispatch(setLoading(true));
    dispatch(updateAddress(values));
    actions.resetForm();
    dispatch(setLoading(false));
    dispatch(toggleAddressModal());

  };


  return (
    <div className="flex flex-col items-center justify-center w-full md:w-[35rem] rounded-xl">
        <div className='flex flex-1 items-center justify-between bg-[#F0F2F2] text-md font-bold border-b-2 border-gray-200 w-full p-4'>
            <h1>Update your shipping address</h1>
            <FaTimes onClick={()=> dispatch(toggleAddressModal())} className=' cursor-pointer'/>
        </div>
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ values, setFieldValue, isSubmitting }) => (
                <Form className='w-full p-10'>
                <InputField label="Full name (First and Last name)" name="fullName" type="text" placeholder="First and last name" />
                <InputField label="Street address" name="streetAddress" type="text" placeholder="Street address, P.O. Box, work address, c/o" />
                <InputField name="streetAddress2" type="text" placeholder="Apartment, suite, unit, building, floor, etc" />
                <InputField label="City / Town / Village" name="city" type="text" placeholder="City / Town / Village" />
                <InputField label="Region" name="region" type="text" placeholder="Region" />
                <InputField label="Phone Number" name="phone" type="text" placeholder="Your Phone Number" />
                <button
                    className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-700 font-semibold py-2 rounded-md mt-4 p-4 text-sm"
                    type="submit"
                >
                    Save Address
                </button>
                </Form>
            )}
        </Formik>
    </div>
  );
};

export default AddAddress;
