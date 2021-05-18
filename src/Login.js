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

    const [validated, setValidated] = useState(false);
    const [adoption, setAdoption] = useState(false);
    let history = useHistory();

    React.useEffect(() => {
        if (props.location.state) {
            setAdoption(props.location.state.adoption)
        }
        if (localStorage.getItem("currentLogin")) {
            if (adoption) {
                history.push("/adopt")
            } else {
                history.push("/myaccount")
            }
        }
    }, [history, props.location.state, adoption])

    const loginSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget
        if(form.checkValidity() === false) {
            event.stopPropagation()
        } else {
            const username = form.loginUsername.value
            const password = form.loginPassword.value
            const user  = { username: username, password: password }

            fetch("/api/login",
                {method:"POST", headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },body:JSON.stringify(user)})
            .then(response => response.json())
            .then(data => {
                if(data){
                    setValidated(true)
                    localStorage.setItem("currentLogin", username)
                    if (adoption) {
                        history.push("/adopt")
                    } else {
                        history.push("/myaccount")
                    }
                } else {
                    setValidated(false)
                    const fields = [document.getElementById("loginUsername"), document.getElementById("loginPassword")]
                    fields.forEach(field => {
                        field.classList.add("field-rejected")
                        setTimeout(() => {
                            field.classList.remove("field-rejected")
                        }, 3000)
                    })
                }
            })
        }
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
                    <Form onSubmit={loginSubmit} validated={validated}>
                        <Form.Group controlId="loginUsername">
                            <Form.Label>
                                Username
                            </Form.Label>
                            <Form.Control required type="text" placeholder="Enter username" autoComplete="on"/>
                        </Form.Group>
                        <Form.Group controlId="loginPassword">
                            <Form.Label>
                                Password
                            </Form.Label>
                                <Form.Control required type="password" placeholder="Enter password" autoComplete="on"/>
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
            <Register adoption={adoption}/>
        </Modal>
    </>
    )
}

export default Login;