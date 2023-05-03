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
    addToSelected: (state, action) => {
      const selected = [...state.selected.items, action.payload]
      state.selected = selected;
      localStorage.setItem('selected', JSON.stringify(selected));
    },
    removeFromSelected: (state, action) => {
      const index = state.selected.findIndex(item => item.id === action.payload)
      let newSelected = [...state.selected]
      newSelected.splice(index, 1)
      state.selected = newSelected
      localStorage.setItem('selected', JSON.stringify(newSelected));
    },
  


  },
});

export const { addItem, removeItem, localCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartItemsWithName = (state, name) => state.cart.items.filter(item => item.name === name)
export const selectCartTotal = state => state.cart.items.reduce((total, item) => total + item.price, 0)

export default cartSlice.reducer;
