import React, {useEffect, useState} from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import axios, {isCancel, AxiosError} from 'axios';
import useFirestore from '../hooks/useFirestore';
import { Formik, Form } from 'formik';
import {InputField, ListboxComponent } from './Fields';
import Stripe from 'stripe';




const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
];

interface InitialValues {
  fullName: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postal_code?: string;
  country?: string;
}

export default function SetupForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [stripeId, setStripeId] = useState(null)
  const [listboxSelected, setListboxSelected] = useState(null)
  

  const { readOneDoc } = useFirestore(null);

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
    console.log(error);
    
  }

  useEffect(() => {
    readOneDoc('users').then((doc) => {
      setStripeId(doc.stripe_id);
    })
  }, [])
  

  const onSubmit = async (values: InitialValues) => {
    console.log(values);
    
    // event.preventDefault();    

    if (!stripe) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    // Create the SetupIntent and obtain clientSecret
    await axios.post('/api/stripe-assets/intents', { 
      operation: 'setup_intent', 
      customer_id: stripeId,
      fullName: values.fullName,
      phone: values.phone,
      address: {
        line1: values.line1,
        line2: values.line2,
        city: values.city,
        state: values.state,
        postal_code: values.postal_code,
        country: values.country,
      },
    })
    .then(async({ data }) =>{   
      console.log(data);
         
      // Confirm the SetupIntent using the details collected by the Payment Element
      const {error, } = await stripe.confirmSetup({
        elements,
        clientSecret: data.clientSecret,
        confirmParams: {
          return_url: 'http://localhost:3000/checkout',
        },
      });
      
      if (error) {
        handleError(error);
        return;
      }
    })

  };

  const initialValues: InitialValues = {
    fullName: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'Gambia',
  }


  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      enableReinitialize
    >
    {({ values, setFieldValue, isSubmitting }) => (
      <Form>
        <InputField label="Name on the card" name="fullName" type="text" placeholder="First and last name" />
        <InputField label="Phone" name="Phone" type="text" placeholder="Phone number" />
        <InputField label="Street address" name="line1" type="text" placeholder="Street address" />
        <InputField label="Address 2" name="line2" type="text" placeholder="" />
        <InputField label="Postal code" name="line2" type="text" placeholder="Postal or zip code" />
        <InputField label="city / Town / Village" name="line2" type="text" placeholder="city / Town / Village" />
        <InputField label="Region" name="line2" type="text" placeholder="Region" />
        <ListboxComponent 
          listboxSelected={listboxSelected} 
          setListboxSelected={setListboxSelected} 
          arr={people} 
        />
        <PaymentElement />
        <button
            className="btn btn-primary bg-yellow-500 rounded-md px-4 py-2 text-white font-semibold my-4"
            type="submit"
        >
            Submit
        </button>
      </Form>
    )}
    </Formik>
    // <form onSubmit={handleSubmit}>
    //   <PaymentElement />
    //   <button 
    //     type="submit" disabled={!stripe || loading} 
    //     className="btn btn-primary bg-yellow-500 rounded-md px-4 py-2 text-white font-semibold my-4"
    //   >
    //     Submit
    //   </button>
    //   {errorMessage && <p>{errorMessage}</p>}
    // </form>
  );
}