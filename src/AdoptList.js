import React, { useState } from "react";
import NewCatCard from "./NewCatCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";

function AdoptList(props) {
    const [currentCatsList, setCurrentCatsList] = useState([]);
    React.useEffect(() => {
        refreshCatsList()
    }, [])

    function refreshCatsList() {
        let catsList = []
        const entriesOnPage = 6
        for (let i = 0; i < entriesOnPage; i++) {
            catsList.push(<NewCatCard/>)
        }
        setCurrentCatsList(catsList)
    }

    function CatCardsList() {
        let catCardsList = []
        for (let i = 0; i < currentCatsList.length; i++) {
            catCardsList.push(
                <Col xs={12} sm={12} md={6} lg={4} className="my-3" key={"NewCatCard"+i}>
                    {currentCatsList[i]}
                </Col>
            )
        }
        return catCardsList
    }

    return(
        <Container>
            <Row>
                <Col className="text-center">
                    <h1>Up for adoption!</h1>
                    <p>
                        These cats have been generated just now. <br/>
                        If you leave the page, they will be gone forever! <br/>
                        To see more cats, click the button at the bottom of the page.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Row>
                        <CatCardsList/>
                    </Row>
                    <Row>
                        <Col className=" my-3 d-flex justify-content-center">
                            <Button variant="success" onClick={refreshCatsList}>
                                Show me more cats
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default AdoptList;