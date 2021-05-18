import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CatCard from "./CatCard";

function Account() {
    const [user] = useState(localStorage.getItem("currentLogin"));
    const [myCats, setMyCats] = useState([]);
    let history = useHistory();
    React.useEffect(() => {
        if (!user) {
            history.push("/login")
        } else {
            fetch("http://localhost:8080/api/mycats",
            {method:"POST", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body:JSON.stringify({ username: user })})
            .then(response => response.json())
            .then(data => {
                setMyCats(data)
            })
        }
    }, [user, history])
        
    function MyCats() {
        let myCatCards = []
        myCats.forEach((entry) => {
            myCatCards.push(
                <Col xs={12} sm={12} md={6} lg={4} className="my-3" key={entry.cat.name+entry.cat.info.breed}>
                    <CatCard cat={entry.cat} adoptable="false"/>
                </Col>
            )
        })
        return myCatCards
    }

    function logOut() {
        localStorage.removeItem("currentLogin")
        history.push("/")
    }
    

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-center">
                        {user}'s Cats
                    </h1>
                    <hr/>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <Button variant="outline-primary" size="sm" onClick={logOut}>
                        Log out
                    </Button>
                </Col>
            </Row>
            <Row>
                <MyCats/>
            </Row>
        </Container>
    )
}

export default Account;