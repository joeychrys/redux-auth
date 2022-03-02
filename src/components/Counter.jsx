import React from "react";

// bootstrap imports
import { Row, Col, Container, Button } from "react-bootstrap";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { addOne, selectCount } from "../features/counter/counterSlice";


const Counter = () => {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(addOne())
  }

  return (
    <>
      <Container className="mt-4">
        <Row className="m-3">
          <Col className="d-flex justify-content-center">
            <h1>Counter with Redux</h1>
          </Col>
        </Row>
        <Row className="m-3">
          <Col className="d-flex justify-content-end">
            <h1>Count:</h1>
          </Col>
          <Col className="d-flex justify-content-start">
            <h1>{count}</h1>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button variant="dark" size="lg" onClick={handleClick}>
              Add to Count
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Counter;
