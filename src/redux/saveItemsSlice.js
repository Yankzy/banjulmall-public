import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  selected: [],
};

const saveItemsSlice = createSlice({
  name: 'saveItems',
  initialState,
  reducers: {
    addSavedItem: (state, action) => {
      let saveItems;
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex === -1) {
        saveItems = [...state.items, action.payload];
        state.items = saveItems;
      }else{
        saveItems = [...state.items];
        saveItems[itemIndex].quantity = action.payload.quantity;
        state.items = saveItems;
      }
      localStorage.setItem('saveItems', JSON.stringify(saveItems));
    },
    removeSavedItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload)
      let newSaveItems = [...state.items]
      newSaveItems.splice(index, 1)
      state.items = newSaveItems
      localStorage.setItem('saveItems', JSON.stringify(newSaveItems));
    },
    localSaveItems: (state) => {
      const saveItems = JSON.parse(localStorage.getItem('saveItems'));
      if (Array.isArray(saveItems)) state.items = saveItems;
    },

  },
});

export const { addSavedItem, removeSavedItem, localSaveItems } = saveItemsSlice.actions;
export default saveItemsSlice.reducer;
