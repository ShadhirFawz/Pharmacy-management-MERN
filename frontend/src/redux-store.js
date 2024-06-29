import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './features/login.js';
import userDropReducer from './features/userDropDown.js';

const store = configureStore({
  reducer: {
    login:loginReducer,
    userDropDown:userDropReducer,
  },
});

export default store;