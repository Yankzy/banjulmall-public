import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: true,
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
    
  },
});

export const { setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
