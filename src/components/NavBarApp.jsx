import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

import logoutAction from "../features/auth/actions/logoutAction";
import { useDispatch, useSelector } from "react-redux";
import { selectUsername } from "../features/user/userSlice";
import usernameAction from "../features/user/usernameAction";

import LocalStorageService from "../services/LocalStorageService";

import { useEffect } from "react";
import { Link } from "react-router-dom";

const NavBarApp = () => {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  const localstorage = LocalStorageService.getService();

  const handleLogout = () => {
    dispatch(logoutAction()).then(() => {
      localstorage.clearToken();
    });
  };

  useEffect(() => {
    if (username === "") {
      dispatch(usernameAction());
    }
  }, [dispatch]);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Counter</Nav.Link>
            <Nav.Link as={Link} to="/user">{username}</Nav.Link>
            <Button onClick={handleLogout}>Logout</Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBarApp;
