import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'sidebar',
  initialState: { 
    leftSidebarModal: false,
    rightSidebarModal: false,
    overlayIsVisible: false,
    addressModal: false,
    addCardModal: false,
  },
  reducers: {
    toggleModal: (state, action) => {
      const modalName = action.payload;
      state[modalName] = !state[modalName];
    },
    toggleOverlay: (state) => {
      Object.keys(state).forEach(key => state[key] = false);
    },
  },
});

export const { toggleModal, toggleOverlay } = modalSlice.actions;

export default modalSlice.reducer;
