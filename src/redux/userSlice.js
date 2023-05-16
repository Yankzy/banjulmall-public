import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: true,
  address: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateAddress: (state, action) => {
      let address;
      const addressIndex = state.address.findIndex(adrs => adrs.id === action.payload.id);
      if (addressIndex === -1) {
        address = [...state.address, action.payload];
        state.address = address;
      }else{
        // replace the object at addressIndex with new object
        address = [...state.address];
        address[addressIndex] = action.payload;
        state.address = address;
      }
    }
    
  },
});

export const { setUser, setLoading, updateAddress } = userSlice.actions;

export default userSlice.reducer;
