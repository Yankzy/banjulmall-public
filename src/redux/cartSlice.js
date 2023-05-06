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
      cart = itemIndex === -1 ? [...state.items, action.payload] : [...state.items];
      itemIndex === -1 ? null : (cart[itemIndex].quantity = action.payload.quantity);
      state.items = cart;
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
    }
  },
});

export const { addItem, removeItem, localCart } = cartSlice.actions;
export default cartSlice.reducer;
