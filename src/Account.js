import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CatCard from "./CatCard";

function Account() {
    const [user, setUser] = useState(localStorage.getItem("currentLogin"));
    const [myCats, setMyCats] = useState([]);
    let history = useHistory;
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
                console.log(data)
            })
        }
    }, [user, history])
        
    function MyCats() {
        let myCatCards = []

        console.log(myCats)

        myCats.forEach((entry) => {
            myCatCards.push(
                <Col xs={12} sm={12} md={6} lg={4} className="my-3" key={entry.cat.name+entry.cat.info.breed}>
                    <CatCard cat={entry.cat} adoptable="false"/>
                </Col>
            )
        })

        return myCatCards
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
                <MyCats/>
            </Row>
        </Container>
    )
}

export default Account;