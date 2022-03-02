import { createSlice } from "@reduxjs/toolkit";
import  loginAction  from "./actions/loginAction";
import logoutAction from "./actions/logoutAction";
import refreshAction from "./actions/refreshAction";
import usernameAction from "./actions/usernameAction";

const initialState = {
  isLoggedIn: false,
};

// These are the reducers
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  extraReducers: {
    [loginAction.fulfilled]: (state) => {
      state.isLoggedIn = true;
    },
    [loginAction.rejected]: (state) => {
      state.isLoggedIn = false;
    },
    [logoutAction.fulfilled]: (state) => {
      state.isLoggedIn = false;
    },
    [logoutAction.rejected]: (state) => {
      state.isLoggedIn = false;
    },
    [refreshAction.fulfilled]: (state) => {
      state.isLoggedIn = true;
    },
    [refreshAction.rejected]: (state) => {
      state.isLoggedIn = false;
    },
    [usernameAction.fulfilled]: (state) => {
      state.isLoggedIn = true;
    },
    [usernameAction.rejected]: (state) => {
      state.isLoggedIn = false;
    },
  },
});

// Selects whether or not the user is logged in
export const selectLoginState = (state) => state.auth.isLoggedIn;

// This export is used for the store
export default authSlice.reducer;