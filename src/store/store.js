import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import contentReducer from './contentSlice';
import collectionReducer from './collectionSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    content: contentReducer,
    collections: collectionReducer,
  },
});