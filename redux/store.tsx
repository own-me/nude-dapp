import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user';

export default configureStore({
  reducer: {
      user: userReducer
  }
});