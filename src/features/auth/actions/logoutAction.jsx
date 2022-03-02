import axiosInstance from "../../../services/AxiosBase";
import LocalStorageService from "../../../services/LocalStorageService";

import { createAsyncThunk } from "@reduxjs/toolkit";

const logoutAPI = () => {
  const localStorageService = LocalStorageService.getService();
  const accessToken = localStorageService.getAccessToken();
  const refreshToken = localStorageService.getRefreshToken();
  const headers = {Authorization: "JWT " + accessToken}

  if (accessToken) {
    console.log("access token recieved");
    return axiosInstance.post("api/auth/logout/blacklist", {refresh: refreshToken}, {headers: headers});
  } else {
    return console.log("Access Token does not exist");
  }
};

const logoutAction = createAsyncThunk("auth/logout", async () => {
  await logoutAPI();
  return { isLoggedIn: false };
});

export default logoutAction;
