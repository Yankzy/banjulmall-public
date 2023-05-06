import { createSlice } from '@reduxjs/toolkit';


const mobileSlice = createSlice({
  name: 'cart',
  initialState: {
    isMobile: false,
  },
  reducers: {
    changeMobileStatus: (state, action) => {
      state.isMobile = action.payload;
    }
  },
});

export const { addItem } = mobileSlice.actions;
export default mobileSlice.reducer;
