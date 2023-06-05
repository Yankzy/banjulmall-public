import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { PaymentIntent } from '@stripe/stripe-js'
import getStripe from '../utils/getStripe'
import { fetchPostJSON } from '../utils/apiHelpers'
import ElementsForm from './ElementsForm'
import {PaymentElement} from '@stripe/react-stripe-js';
import SetupForm from './SetupForm'


const SetupIntentForCard: NextPage = () => {
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null)
  const [stripePromise, setStripePromise] = useState(null);

  const options = {
    mode: 'setup' as const,
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance: {/*...*/},
  };

  useEffect(() => {
    setStripePromise(getStripe());
  }, []);


  // useEffect(() => {
  //   fetchPostJSON('/api/payment_intents', {
  //     amount: Math.round(5000.0 / 5.0),
  //   }).then((data) => {
  //     setPaymentIntent(data)
  //   })
  // }, [paymentIntent])


  return (
    <Elements stripe={stripePromise} options={options}>
      <SetupForm />
    </Elements>
  );
}

export default SetupIntentForCard