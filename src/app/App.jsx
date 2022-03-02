import React from "react";
import { useEffect } from "react";

// React Router
import { Outlet, Routes, Route, Navigate } from "react-router";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

// Redux
import { selectLoginState } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

// Navbar Component
import NavBarApp from "../components/NavBarApp";

// Import pages
import Counter from "../components/Counter";
import Login from "../components/Login";
import UserInfo from "../components/UserInfo";

import LocalStorageService from "../services/LocalStorageService";
import {
  setAccessToken,
  setRefreshToken,
  setLoggedIn,
} from "../features/auth/authSlice";
import refreshAction from "../features/auth/actions/refreshAction";

import jwtDecode from "jwt-decode";

function LayoutsWithNavbar() {
  return (
    <>
      {/* Your navbar component */}
      <NavBarApp />

      <Outlet />

      {/* add a footer to get fancy*/}
    </>
  );
}

function App() {
  const isLoggedIn = useSelector(selectLoginState);
  const localstorage = LocalStorageService.getService();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localstorage.getAccessToken()) {
      const access_token = localstorage.getAccessToken();
      const refresh_token = localstorage.getRefreshToken();
      const exp = jwtDecode(access_token).exp;

      if (exp * 1000 < Date.now()) {
        dispatch(refreshAction()).then(() => {
          dispatch(setLoggedIn(true));
          navigate("/");
        });
      } else {
        dispatch(setLoggedIn(true));
        dispatch(setAccessToken(access_token));
        dispatch(setRefreshToken(refresh_token));
        navigate("/");
      }
    } else {
      console.log("Tokens do not exist");
    }
  }, [dispatch]);

  return (
    <Routes>
      {/* Routes that need a navbar */}
      <Route path="/" element={<LayoutsWithNavbar />}>
        <Route
          path={AppRoutes.Counter.path}
          element={isLoggedIn ? <Counter /> : <Navigate to="/login" />}
        />
        <Route
          path={AppRoutes.UserInfo.path}
          element={isLoggedIn ? <UserInfo /> : <Navigate to="/login" />}
        />
      </Route>

      {/* Routes that dont't need a navbar */}
      <Route path={AppRoutes.Login.path} element={<Login />} />
    </Routes>
  );
}

export default App;
