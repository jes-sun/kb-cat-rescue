import { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Register from "./Register.js";

function Login() {
    const [register, setRegister] = useState(false);
    const handleClose = () => setRegister(false);
    const handleShow = () => setRegister(true);

    return(
        <>
        <Container>
            <Row>
                <Col>
                    <h1>
                       Login 
                    </h1>
                    <hr/>
                    <Form>
                        <Form.Group controlId="loginUsername">
                            <Form.Label>
                                Username
                            </Form.Label>
                            <Form.Control type="text" placeholder="Enter username" autoComplete="on"/>
                        </Form.Group>
                        <Form.Group controlId="loginPassword">
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control type="password" placeholder="Enter password" autoComplete="on"/>
                        </Form.Group>
                        <div className="d-flex justify-content-between">
                            <em>
                                Don't have an account? Click <a href="#register" onClick={handleShow}>here</a> to register.
                            </em>
                            <Button variant="success" type="submit">
                                Log In
                            </Button>
                        </div>    
                    </Form>
                </Col>
            </Row>
        </Container>
        <Modal 
            show={register} 
            onHide={handleClose}
            size="lg"
            >
        <Register/>
        </Modal>
    </>
    )
}

export default Login;