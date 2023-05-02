import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/Fields';
import Head from 'next/head';
import { signUp, updateInfo } from '../../firebase/Config';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/userSlice';
import { useRouter } from 'next/router';

const Signup = () => {
    const initialValues = {
        fullName: '',
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Enter your first and last name'),
        email: Yup.string().email('Invalid email address').required('Enter your email'),
        password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Enter your password'),
    });

    const dispatch = useDispatch();
    const loading = useSelector(({user}) => user.loading);
    const router = useRouter();

    const onSubmit = async(values, actions) => {
        dispatch(setLoading(true));
        const { fullName, email, password } = values;
        actions.resetForm();
        await signUp(email, password)
        .then((res) => {
            updateInfo(fullName);
        }).catch((err) => {
            console.log(err);
        })

        dispatch(setLoading(false));
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Head>
            <title>Sign Up | Banjul Mall</title>
            </Head>
            <div className="w-full max-w-md p-8 rounded-md shadow-md border border-gray-300 ">
                <div className="text-center mb-6">
                <p 
                    onClick={()=> router.push('/') }
                    className='text-2xl font-extrabold cursor-pointer'>
                    BM
                </p>
                <h2 className="font-bold mt-4">Create account</h2>
                </div>
                <div className='left-1/2'>
                    <Formik 
                        initialValues={initialValues} 
                        validationSchema={validationSchema} 
                        onSubmit={onSubmit}
                        enableReinitialize
                    >
                    {({ values, setFieldValue, isSubmitting }) => (
                        <Form>
                        <InputField label="Your Name" name="fullName" type="text" placeholder="First and last name" />
                        <InputField label="Email" name="email" type="email" placeholder="Email" />
                        <InputField label="Password" name="password" type="password" placeholder="password" />
                        <button
                            className="w-full bg-yellow-400 hover:bg-yellow-700 font-semibold py-2 rounded-md mt-4"
                            type="submit"
                        >
                            Create your Banjul Mall account
                        </button>
                        </Form>
                    )}
                    </Formik>
                </div>
                <p className="text-sm mt-6 text-center">
                By creating an account, you agree to Banjul Mall's{' '}
                <a href="/privacy" className="text-blue-600 hover:underline">
                    Conditions of Use
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Notice
                </a>
                .
                </p>
                <hr className="my-6" />
                <p className="text-sm text-center">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 hover:underline">
                    Sign in
                </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
