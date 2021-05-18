import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Register(props) {
    const [validated, setValidated] = useState(false);

    let history = useHistory();
    const registerSubmit = (event) => {
        console.log("props",props)
        event.preventDefault();
        const form = event.currentTarget

        if(form.checkValidity() === false) {
            event.stopPropagation()
        } else {
            const username = form.registerUsername.value
            const password = form.registerPassword.value
            const user  = { username: username, password: password }

            console.log("attempt registration", user)
            fetch("/api/register",
                {method:"POST", headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },body:JSON.stringify(user)})
            .then(response => response.json())
            .then(data => {
                if(data){
                    setValidated(true)
                    localStorage.setItem("currentLogin", username)
                    if(props.adoption) {
                        history.push("/adopt")
                    } else {
                        history.push("/myaccount")
                    }
                } else {
                    setValidated(false)
                    const fields = [document.getElementById("registerUsername")]
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
        <Container>
            <Modal.Header className="mb-1" closeButton>
                <Row className="ml-auto">
                    <Col className="d-flex flex-column align-items-center">
                        <h1>
                            Register
                        </h1>                       
                    </Col>
                </Row>
            </Modal.Header>
            <Form onSubmit={registerSubmit} validated={validated}>
                <Modal.Body>
                    <Row>
                        <Col>
                            <h5>
                                Why register?
                            </h5>
                            <p>
                                Users who register can adopt as many cats as they wish!
                                Cats they adopt are saved forever on their account.
                            </p>
                        </Col>
                        <Col>
                            <Form.Group controlId="registerUsername">
                                <Form.Label>
                                    Username
                                </Form.Label>
                                <Form.Control required type="text" placeholder="Enter username" autoComplete="on"/>
                            </Form.Group>
                            <Form.Group controlId="registerPassword">
                                <Form.Label>
                                    Password
                                </Form.Label>
                                <Form.Control required type="password" placeholder="Enter password" autoComplete="on"/>
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" className="mx-1" variant="success">
                        Register
                    </Button>                 
                </Modal.Footer>
            </Form>
        </Container>
    )
}

export default Register;