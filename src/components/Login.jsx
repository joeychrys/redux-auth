import React from "react";
import { useState, useEffect } from "react";

// Bootstrap
import { Row, Col, Container, Button, Form } from "react-bootstrap";

// Redux
import { useDispatch } from "react-redux";
import loginAction from "../features/auth/actions/loginAction";
import usernameAction from "../features/auth/actions/usernameAction";
import refreshAction from "../features/auth/actions/refreshAction";

import jwtDecode from "jwt-decode";

import LocalStorageService from "../services/LocalStorageService";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const localstorage = LocalStorageService.getService();

  const initialFormData = Object.freeze({
    username: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = () => {
    dispatch(
      loginAction({
        username: formData.username,
        password: formData.password,
      })
    ).then(() => {
      redirect("/");
    });
    updateFormData(initialFormData);
  };

  useEffect(() => {
    const accessToken = localstorage.getAccessToken();
    if (accessToken) {
      const exp = jwtDecode(accessToken).exp;
      console.log(exp);
      if (exp * 1000 < Date.now()) {
        console.log("Token expired");
        dispatch(refreshAction()).then(() => {
          redirect("/");
        });
      } else {
        console.log("Token is okay");
        dispatch(usernameAction());
      }
    } else {
      console.log("token does not exist");
    }
  },[]);

  return (
    <>
      <Container>
        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <h1>Login Page</h1>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="dark" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center"></Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
