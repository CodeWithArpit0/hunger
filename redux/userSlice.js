import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    isLoggedIn: false,
  },
  reducers: {
    initializeUser: (state, action) => {
      state.currentUser = action.payload.currentUser;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    reset: (state) => {
      state.currentUser = {};
      state.isLoggedIn = false;
    },
  },
});

export const { initializeUser, reset, updateCurrentUser } = userSlice.actions;
export default userSlice.reducer;
