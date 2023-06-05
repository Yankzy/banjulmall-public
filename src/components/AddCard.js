
import { FaTimes } from 'react-icons/fa';
import { toggleModal } from '../redux/modalSlice';
import { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import getStripe from '../utils/getStripe'
import SetupForm from './SetupForm'
import { useDispatch } from 'react-redux';





const AddCard = ({ title, }) => {
    const [paymentIntent, setPaymentIntent] = useState(null)
    const [stripePromise, setStripePromise] = useState(null);
    const dispatch = useDispatch();

    const options = {
        mode: 'setup' ,
        currency: 'gmd',
        // Fully customizable with appearance API.
        appearance: {/*...*/},
    };

    useEffect(() => {
        setStripePromise(getStripe());
    }, []);


    return (
        <div className="flex flex-col items-center justify-center w-full h-screen md:w-[35rem] rounded-xl overflow-y-scroll">
            <div className='flex flex-1 items-center justify-between bg-[#F0F2F2] text-md font-bold border-b-2 border-gray-200 w-full p-4'>
                <h1>Add a credit or debit card</h1>
                <FaTimes onClick={()=> dispatch(toggleModal('addCardModal'))} className=' cursor-pointer'/>
            </div>
            <Elements stripe={stripePromise} options={options}>
                <SetupForm />
            </Elements>
        </div>
    );
};

export default AddCard;
