import { configureStore } from '@reduxjs/toolkit';
import overlayReducer from './overlaySlice';
import sidebarReducer from './sidebarSlice';


const store = configureStore({
  reducer: {
    overlay: overlayReducer,
    sidebar: sidebarReducer,
  },
});

export default store;