import React from "react";

import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Register() {

    const registerSubmit = (event) => {
        const form = event.currentTarget
        const username = form.registerUsername.value
        const password = form.registerPassword.value
        const user  = { username: username, password: password }

        console.log("attempt registration", user)
        fetch("http://localhost:8080/api/register",
            {method:"POST", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },body:JSON.stringify(user)})
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
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
            <Form onSubmit={registerSubmit}>
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
                                <Form.Control type="text" placeholder="Enter username" autoComplete="on"/>
                            </Form.Group>
                            <Form.Group controlId="registerPassword">
                                <Form.Label>
                                    Password
                                </Form.Label>
                                <Form.Control type="password" placeholder="Enter password" autoComplete="on"/>
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