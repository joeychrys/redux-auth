import axiosInstance from "../../services/AxiosBase";
import LocalStorageService from "../../services/LocalStorageService";

import { createAsyncThunk } from "@reduxjs/toolkit";

const usernameAPI = () => {
  const localStorageService = LocalStorageService.getService();
  const accessToken = localStorageService.getAccessToken();

  return axiosInstance
    .get("api/auth/user", {
      headers: { Authorization: "JWT " + accessToken },
    })
};

const usernameAction = createAsyncThunk(
  "user/username", 
  async (thunkAPI) => {
    const response = await usernameAPI();
    return response.data.username ;
});

export default usernameAction;
