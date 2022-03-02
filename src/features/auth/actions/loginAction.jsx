import axiosInstance from "../../../services/AxiosBase";
import LocalStorageService from "../../../services/LocalStorageService";

import { createAsyncThunk } from "@reduxjs/toolkit";

// Sign in Post
const loginAPI = (username, password) => {
  const localStorageService = LocalStorageService.getService();

  return axiosInstance
    .post("api/auth/token/", { username, password })
    .then((res) => {
      localStorageService.setToken(res.data);
    });
};

// This Thunk is an async action that calls the api
// this can be dispatched like other actions
const loginAction = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    await loginAPI(username, password);
    return { isLoggedIn: true };
  }
);

// This exposts the action that takes in the username and password from
// the UI and then sends a request using axios
export default loginAction;
