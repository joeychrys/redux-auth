import React from "react";

// React Router
import { Outlet ,Routes, Route, Navigate} from 'react-router';
import { AppRoutes } from "./AppRoutes";

// Redux
import { selectLoginState } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

// Navbar Component
import NavBarApp from "../components/NavBarApp";

// Import pages
import Counter from "../components/Counter";
import Login from "../components/Login"

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

  return (
    <Routes>

      {/* Routes that need a navbar */}
      <Route path="/" element={<LayoutsWithNavbar/>}>
        <Route path={AppRoutes.Counter.path} element={isLoggedIn ?<Counter/>: <Navigate to="/login"/>}/>
      </Route>

      {/* Routes that dont't need a navbar */}
      <Route path={AppRoutes.Login.path} element={<Login/>}/>

    </Routes>
  );
}

export default App;
