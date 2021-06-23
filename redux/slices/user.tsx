import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: ""
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload.name;
    }
  }
});

export const { setName } = userSlice.actions;

export default userSlice.reducer;