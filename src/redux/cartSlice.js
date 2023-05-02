import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
        const cart = [...state.items, action.payload];
        state.items = cart;
        localStorage.setItem('cart', JSON.stringify(cart));
    },
    removeItem: (state, action) => {
        const index = state.items.findIndex(item => item.name === action.payload.name)
        let newCart = [...state.items]
        newCart.splice(index, 1)
        state.items = newCart
        localStorage.setItem('cart', JSON.stringify(newCart));
    },
    localCart: (state) => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        if (Array.isArray(cart)) state.items = cart;
    },


  },
});

export const { addItem, removeItem, localCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartItemsWithName = (state, name) => state.cart.items.filter(item => item.name === name)
export const selectCartTotal = state => state.cart.items.reduce((total, item) => total + item.price, 0)

export default cartSlice.reducer;
