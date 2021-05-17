import React from "react";

import "./css/App.css";
import CatCard from "./CatCard.js";
import NewCatCard from "./NewCatCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";

import logo from "./images/logo-2.png";


function Homepage() {
    const cachedCat =  sessionStorage.getItem("catOfTheDay")
    const catOfTheDay = cachedCat ? <CatCard cat={JSON.parse(cachedCat)}/> : <NewCatCard catOfTheDay="true"/>


    return(
        <Container>
            <Row>
                <Col className="text-center">
                    <img src={logo} alt="Kilobyte Cat Rescue" height="100em"/>                                       
                    <h1>
                        Kilobyte Cat Rescue
                    </h1>
                    <hr/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>
                        Adopt a new digital friend today!
                    </h4>
                    <p>
                        Welcome to the Kilobyte Cat Rescue! 
                        This is a unique shelter — all of the cats are randomly generated! 
                        Despite their digital existence, these cats are still adorable and looking for new homes... perhaps you might have a place for one? 
                        Take a look, you might just meet a new friend!
                    </p>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Button variant="primary" href="/cats">
                                See cats
                            </Button>
                        </Col>
                    </Row>
                    <hr/>
                    <h4>
                        Support real-life animals in need!
                    </h4>
                    <p>
                        Randomly generated cats are all good and fun, but there are real animals out there that could use real homes.
                        If you want to support actual animals, you can visit some of the links below.
                    </p>
                    <Row>
                        <Col className="d-flex justify-content-between">
                            <Button className="mx-1" variant="outline-primary" href="https://ontariospca.ca/">
                                Ontario SPCA
                            </Button>
                            <Button className="mx-1" variant="outline-primary" href="https://ontariospca.ca/">
                                Pet Patrol K/W
                            </Button>
                            <Button className="mx-1" variant="outline-primary" href="https://www.torontohumanesociety.com/">
                                Toronto Humane Society
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col className="text-center" xs={12} md={4}>
                    <h2>
                        Cat of the Day
                    </h2>
                    <div>
                        {catOfTheDay}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Homepage;