import axiosInstance from "./AxiosClient";
import LocalStorageService from "./LocalStorageService";

// Get Chart data
export function getChartData() {
  return axiosInstance.get("react-api/");
}

// Get Chart data
export function getCurrentUser() {
  return axiosInstance.get("api/auth/currentuser");
}

// Create New User
export function postNewUser(data) {

  return axiosInstance
    .post("api/auth/register", JSON.stringify(data))
    .then(() => {
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}

// Sign in Post
export function postSignIn(data) {
  const localStorageService = LocalStorageService.getService();

  return axiosInstance
    .post("api/token/", JSON.stringify(data))
    .then((res) => {
      localStorageService.setToken(res.data);
    })
    .catch((error) => {
      console.log(error.response.status);
    });
}

// Blacklist token and Logout
export function postLogout() {
  const localStorageService = LocalStorageService.getService();

  return axiosInstance
    .post("api/auth/logout/blacklist", {
      refresh: localStorageService.getRefreshToken(),
    })
    .then(() => {
      console.log("clearing tokens");
      localStorageService.clearToken();
      console.log("removing headers");
      axiosInstance.defaults.headers["Authorization"] = null;
    })
    .catch(() => {
      console.log("tokens do not exist");
    });
}
