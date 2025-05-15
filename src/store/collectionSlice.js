import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collections: [],
  filteredCollections: [],
  selectedFilter: 'all',
  searchTerm: '',
  isLoading: false,
  error: null
};

export const collectionSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setCollections: (state, action) => {
      state.collections = action.payload;
      state.isLoading = false;
      state.error = null;
      state.filteredCollections = filterCollections(
        action.payload,
        state.selectedFilter,
        state.searchTerm
      );
    },
    addCollection: (state, action) => {
      state.collections.unshift(action.payload);
      state.filteredCollections = filterCollections(
        state.collections,
        state.selectedFilter,
        state.searchTerm
      );
    },
    setFilter: (state, action) => {
      state.selectedFilter = action.payload;
      state.filteredCollections = filterCollections(
        state.collections,
        action.payload,
        state.searchTerm
      );
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredCollections = filterCollections(
        state.collections,
        state.selectedFilter,
        action.payload
      );
    }
  },
});

// Helper function to filter collections
const filterCollections = (collections, filter, searchTerm) => {
  let result = [...collections];
  
  // Apply visibility filter
  if (filter === 'public') {
    result = result.filter(collection => collection.is_public);
  } else if (filter === 'private') {
    result = result.filter(collection => !collection.is_public);
  } else if (filter === 'recent') {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    result = result.filter(collection => new Date(collection.updated_at) >= thirtyDaysAgo);
  }
  
  // Apply search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    result = result.filter(collection => 
      collection.title?.toLowerCase().includes(term) || 
      collection.description?.toLowerCase().includes(term)
    );
  }
  
  return result;
};

export const { 
  setLoading, 
  setError, 
  setCollections, 
  addCollection, 
  setFilter,
  setSearchTerm
} = collectionSlice.actions;

export default collectionSlice.reducer;