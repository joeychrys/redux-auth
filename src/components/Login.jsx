import React from "react";
import { useState} from "react";

// Bootstrap
import { Row, Col, Container, Button, Form } from "react-bootstrap";

// Redux
import { useDispatch } from "react-redux";
import loginAction from "../features/auth/actions/loginAction";


import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const redirect = useNavigate();

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
