import React from "react";
import { Navbar, Nav, Container,Button } from "react-bootstrap";

import { Link } from "react-router-dom";

import logoutAction from "../features/auth/actions/logoutAction";
import { useDispatch } from "react-redux";

import LocalStorageService from "../services/LocalStorageService";

const NavBarApp = () => {
  const dispatch = useDispatch();
  const localstorage = LocalStorageService.getService();

  const handleLogout = () => {
    dispatch(logoutAction()).then(() => {
      localstorage.clearToken()
    });
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Counter
            </Nav.Link>
            <Button onClick={handleLogout}>Logout</Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBarApp;
