import axiosInstance from "../../../services/AxiosBase";
import LocalStorageService from "../../../services/LocalStorageService";

import { createAsyncThunk } from "@reduxjs/toolkit";

const refreshAPI = () => {
  const localStorageService = LocalStorageService.getService();
  const refreshToken = localStorageService.getRefreshToken();

  return axiosInstance
    .post("api/auth/token/refresh/", { refresh: refreshToken })
    .then((response) => {
      localStorageService.setToken(response.data);
    });
};

const refreshAction = createAsyncThunk("auth/refresh", async () => {
  await refreshAPI();
  return { isLoggedIn: true };
});

export default refreshAction;
