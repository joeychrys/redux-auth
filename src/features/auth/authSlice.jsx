import { createSlice } from "@reduxjs/toolkit";
import loginAction from "./actions/loginAction";
import logoutAction from "./actions/logoutAction";
import refreshAction from "./actions/refreshAction";

const initialState = {
  isLoggedIn: false,
  refresh_token: "",
  access_token: "",
};

// These are the reducers
const authSlice = createSlice({
  name: "auth",
  reducers: {
    setAccessToken: (state, action) =>{
      state.access_token = action.payload
    },
    setRefreshToken: (state, action) => {
      state.refresh_token = action.payload
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    }
  },
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
  },
});

// Selects whether or not the user is logged in
export const selectLoginState = (state) => state.auth.isLoggedIn;

// export actions
export const {setAccessToken, setRefreshToken, setLoggedIn} = authSlice.actions

// This export is used for the store
export default authSlice.reducer;
