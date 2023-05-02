import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import modalSlice from './modalSlice';
import cartSlice from './cartSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalSlice,
    cart: cartSlice,
  },
});

export default store;