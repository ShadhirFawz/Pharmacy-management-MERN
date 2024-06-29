import { createSlice } from '@reduxjs/toolkit';

export const userDropSlice = createSlice({
  name: 'userDrop',
  initialState: { show: false , display:'d-none'},
  reducers: {
    showUserDrop: (state, action) => {
      state.show=true
      state.display=''
    },
    hideUserDrop: (state, action) => {
      state.show=false
      state.display='d-none'
    },
  },
});

export const { showUserDrop } =
userDropSlice.actions;

export default userDropSlice.reducer;
