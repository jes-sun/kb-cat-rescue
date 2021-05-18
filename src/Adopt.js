import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Adopt(props) {
    let history = useHistory()
    const [cat, setCat] = useState({});
    React.useEffect(() => {
        const cachedCat = JSON.parse(localStorage.getItem("adoptionProcess"))
        if (props.location.state) {
            setCat(props.location.state.cat)
            localStorage.setItem("adoptionProcess", JSON.stringify(props.location.state.cat))
        } else if (cachedCat) {
            setCat(cachedCat)
        } else {
            history.push("/")
        }
    }, [history, props.location.state])

    React.useEffect(() => {
        if(!isLoggedIn()) {
            history.push("/login", {adoption: "true"})
        }
    }, [history])
    
    function isLoggedIn() {
        return localStorage.getItem("currentLogin")
    }

    function adoption() {
        const adoptRequest = { username: isLoggedIn(), cat: cat }
        fetch("/api/adopt",
        {method:"POST", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body:JSON.stringify(adoptRequest)})
        .then(response => response.json())
        .then(data => {
            if (data) {
                localStorage.removeItem("adoptionProcess")
                sessionStorage.removeItem("catOfTheDay")
                history.push("/account")
            }
        })
    }

    return(
        <Container>
            <Row>
                <Col className="text-center">
                    <h1>
                        Ready to adopt {cat.name}?
                    </h1>
                    <hr/>
                </Col>        
            </Row>
            <Row>
                <Col xs={12}>
                    <img src={cat.image} alt={cat.name} width="100%"/>
                </Col>
                <Col className="text-center">
                    <h6 className="my-2">
                        Currently logged in as {isLoggedIn()}
                    </h6>
                    <Button variant="success" className="my-2" onClick={adoption}>
                        Adopt!
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Adopt;