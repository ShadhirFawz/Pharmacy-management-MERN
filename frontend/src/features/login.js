import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: { loggedIn: false},
  reducers: {
    loggedIn: (state, action) => {
      state.loggedIn=action.payload
    },
  },
});

export const { loggedIn } =
  loginSlice.actions;

export default loginSlice.reducer;
