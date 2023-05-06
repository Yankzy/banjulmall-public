import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import modalSlice from './modalSlice';
import cartSlice from './cartSlice';
import saveItemsSlice from './saveItemsSlice';
import mobileSlice from './mobileSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalSlice,
    cart: cartSlice,
    savedItems: saveItemsSlice,
    mobile: mobileSlice,
  },
});

export default store;