
import { createSlice } from '@reduxjs/toolkit';


const modalSlice = createSlice({
  name: 'sidebar',
  initialState: { 
    leftSidebarIsVisible: false,
    rightSidebarIsVisible: false,
    overlayIsVisible: false,
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
    },
  },
});

export const { toggleLeftSidebar, toggleRightSidebar, toggleOverlay } = modalSlice.actions;

export default modalSlice.reducer;
