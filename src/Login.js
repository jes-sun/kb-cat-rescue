import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Register from "./Register.js";

function Login(props) {
    const [register, setRegister] = useState(false);
    const handleClose = () => setRegister(false);
    const handleShow = () => setRegister(true);

    let history = useHistory();

    React.useEffect(() => {
        if (localStorage.getItem("currentLogin")) {
            history.push("/account")
        }
    }, [history])

    const loginSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget
        const username = form.loginUsername.value
        const password = form.loginPassword.value
        const user  = { username: username, password: password }

        fetch("http://localhost:8080/api/login",
            {method:"POST", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },body:JSON.stringify(user)})
        .then(response => response.json())
        .then(data => {
            if(data){
                localStorage.setItem("currentLogin", username)
                if (props.adoption) {
                   window.location.reload();
                } else {
                    history.push("/account")
                }
            }
        })
    }

    return(
        <>
        <Container>
            <Row>
                <Col>
                    <h1>
                       Login 
                    </h1>
                    <hr/>
                    <Form onSubmit={loginSubmit}>
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