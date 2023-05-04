import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import modalSlice from './modalSlice';
import cartSlice from './cartSlice';
import saveItemsSlice from './saveItemsSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalSlice,
    cart: cartSlice,
    savedItems: saveItemsSlice,
  },
});

export default store;