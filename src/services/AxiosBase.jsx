import axios from "axios";
import LocalStorageService from "./LocalStorageService";

// LocalstorageService
const localStorageService = LocalStorageService.getService();

const baseURL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorageService.getAccessToken();
//     if (token) {
//       config.headers["Authorization"] = "JWT " + token;
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

// function refresh_token() {
//   console.log("Refreshing access token");
//   const refresh_token = localStorageService.getRefreshToken();
//   return axios
//     .post("http://localhost:8000/api/token/refresh/", {
//       refresh: refresh_token,
//     })
// }

// let refreshing_token = null;

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const config = error.config;
//     if (error.response && error.response.status === 401 && !config._retry) {
//       config._retry = true;
//       try {
//         refreshing_token = refreshing_token
//           ? refreshing_token
//           : refresh_token();
//         let res = await refreshing_token;
//         refreshing_token = null;
//         if (res.data.access) {
//           console.log("clearing token");
//           localStorageService.clearToken();
//           console.log("setting new token");
//           localStorageService.setToken(res.data);
//         }
//         return axiosInstance(config);
//       } catch (err) {
//         return Promise.reject(err);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
