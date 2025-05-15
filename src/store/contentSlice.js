import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  filteredItems: [],
  selectedCategory: 'all',
  isLoading: false,
  error: null
};

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setContentItems: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
      
      // Apply current category filter
      if (state.selectedCategory === 'all') {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(
          item => item.category === state.selectedCategory
        );
      }
    },
    addContentItem: (state, action) => {
      state.items.unshift(action.payload);
      
      // Update filtered items
      if (state.selectedCategory === 'all' || 
          action.payload.category === state.selectedCategory) {
        state.filteredItems.unshift(action.payload);
      }
    },
    updateContentItem: (state, action) => {
      const index = state.items.findIndex(item => item.Id === action.payload.Id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      
      // Update in filtered items if present
      const filteredIndex = state.filteredItems.findIndex(item => item.Id === action.payload.Id);
      if (filteredIndex !== -1) {
        state.filteredItems[filteredIndex] = action.payload;
      }
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      if (action.payload === 'all') {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(
          item => item.category === action.payload
        );
      }
    }
  },
});

export const { 
  setLoading, 
  setError, 
  setContentItems, 
  addContentItem, 
  updateContentItem,
  setSelectedCategory
} = contentSlice.actions;

export default contentSlice.reducer;