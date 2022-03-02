import axiosInstance from "../../../services/AxiosBase";
import LocalStorageService from "../../../services/LocalStorageService";

import { createAsyncThunk } from "@reduxjs/toolkit";

const refreshAPI = () => {
  const localStorageService = LocalStorageService.getService();
  const refreshToken = localStorageService.getRefreshToken();

  if (refreshToken) {
    console.log("refresh token recieved");
    return axiosInstance
      .post("api/auth/token/refresh/", { refresh: refreshToken })
      .then((response) => {
        localStorageService.setToken(response.data)
      });
  } else {
    return console.log("refresh Token does not exist");
  }
};

const refreshAction = createAsyncThunk("auth/refresh", async () => {
  await refreshAPI();
  return { isLoggedIn: false };
});

export default refreshAction;
