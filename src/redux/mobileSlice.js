import { createSlice } from '@reduxjs/toolkit';


const mobileSlice = createSlice({
  name: 'cart',
  initialState: {
    isMobile: true,
  },
  reducers: {
    changeMobileStatus: (state, action) => {
      console.log(action.payload);
      state.isMobile = action.payload;
    }
  },
});

export const { changeMobileStatus } = mobileSlice.actions;
export default mobileSlice.reducer;
