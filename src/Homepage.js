import React from "react";

import "./css/App.css";
import CatCard from "./CatCard.js";
import NewCatCard from "./NewCatCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function Homepage() {
    const cachedCat =  sessionStorage.getItem("catOfTheDay")
    const catOfTheDay = cachedCat ? <CatCard cat={JSON.parse(cachedCat)}/> : <NewCatCard catOfTheDay="true"/>


    return(
        <Container>
            <Row>
                <Col>
                    <h1>
                        Kilobyte Cat Rescue
                    </h1>
                    <h4>
                        Adopt a new digital friend today!
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col>
                hello
                </Col>
                <Col className="text-center" xs={12} md={4}>
                    <h2>
                        Cat of the Day
                    </h2>
                    {catOfTheDay}
                </Col>
            </Row>
        </Container>
    )
}

export default Homepage;