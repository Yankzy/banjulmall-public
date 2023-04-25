
import { createSlice } from '@reduxjs/toolkit';


const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: { 
    leftSidebarIsVisible: false,
    rightSidebarIsVisible: false,
  },
  reducers: {
    toggleLeftSidebar: (state) => {
      state.leftSidebarIsVisible = !state.leftSidebarIsVisible;
    },
    toggleRighttSidebar: (state) => {
      state.rightSidebarIsVisible = !state.rightSidebarIsVisible;
    },
  },
});

export const { toggleLeftSidebar, toggleRighttSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
