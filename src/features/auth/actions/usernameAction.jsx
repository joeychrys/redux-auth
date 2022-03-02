import axiosInstance from "../../../services/AxiosBase";
import LocalStorageService from "../../../services/LocalStorageService";

import { createAsyncThunk } from "@reduxjs/toolkit";

const usernameAPI = () => {
  const localStorageService = LocalStorageService.getService();
  const accessToken = localStorageService.getAccessToken();

  if (accessToken) {
    console.log("Getting user");
    return axiosInstance.get("api/auth/user", {
      headers: { Authorization: "JWT " + accessToken },
    }).then((res) => {console.log(res.data)});
  } else {
    return console.log("Access Token does not exist");
  }
};

const usernameAction = createAsyncThunk("auth/username", async () => {
  await usernameAPI();
  return { isLoggedIn: true };
});

export default usernameAction;

"test"