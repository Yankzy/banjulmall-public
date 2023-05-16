
import { createSlice } from '@reduxjs/toolkit';


const modalSlice = createSlice({
  name: 'sidebar',
  initialState: { 
    leftSidebarIsVisible: false,
    rightSidebarIsVisible: false,
    overlayIsVisible: false,
    addressModalIsVisible: false,
  },
  reducers: {
    toggleLeftSidebar: (state) => {
      state.leftSidebarIsVisible = !state.leftSidebarIsVisible;
    },
    toggleRightSidebar: (state) => {
      state.rightSidebarIsVisible = !state.rightSidebarIsVisible;
    },
    toggleOverlay: (state) => {
      state.leftSidebarIsVisible = false;
      state.rightSidebarIsVisible = false;
      state.addressModalIsVisible = false;
    },
    toggleAddressModal: (state) => {
      state.addressModalIsVisible = !state.addressModalIsVisible;
    }
  },
});

export const { toggleLeftSidebar, toggleRightSidebar, toggleOverlay, toggleAddressModal } = modalSlice.actions;

export default modalSlice.reducer;
