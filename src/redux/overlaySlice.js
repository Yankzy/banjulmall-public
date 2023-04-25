
import { createSlice } from '@reduxjs/toolkit';


const overlaySlice = createSlice({
  name: 'overlay',
  initialState: { overlayIsVisible: false },
  reducers: {
    toggleOverlay: (state) => {
      state.overlayIsVisible = !state.overlayIsVisible;
    },
  },
});

export const { toggleOverlay } = overlaySlice.actions;

export default overlaySlice.reducer;
