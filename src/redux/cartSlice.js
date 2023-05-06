import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  selected: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      let cart;
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex === -1) {
        cart = [...state.items, action.payload];
        state.items = cart;
      }else{
        cart = [...state.items];
        cart[itemIndex].quantity = action.payload.quantity;
        state.items = cart;
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload)
      let newCart = [...state.items]
      newCart.splice(index, 1)
      state.items = newCart
      localStorage.setItem('cart', JSON.stringify(newCart));
    },
    localCart: (state) => {
      const cart = JSON.parse(localStorage.getItem('cart'));
      if (Array.isArray(cart)) state.items = cart;
    },
    saveForLater: (state, action) => {
      const cart = [...state.items];
      const itemIndex = cart.findIndex(item => item.id === action.payload.id);
      cart[itemIndex].saveForLater = action.payload.saveForLater;
      state.items = cart;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  },
});

export const { addItem, removeItem, localCart, saveForLater } = cartSlice.actions;
export default cartSlice.reducer;
