import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { db, auth } from '../../firebase/Config';
import {
    collection,
    doc,
    updateDoc,
    arrayUnion,
    getDocs,
    getDoc,
    deleteDoc,
    setDoc,
    onSnapshot,
    DocumentData,
    Query,
    QuerySnapshot,
    DocumentReference,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';


export const stripeServiceApi = createApi({
    reducerPath: 'stripeServiceApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/stripe-assets' }),
    endpoints: (builder) => ({
        createStripeCustomer: builder.mutation({
            query: (body) => ({
                url: '/create_customer',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useCreateStripeCustomerMutation } = stripeServiceApi;
