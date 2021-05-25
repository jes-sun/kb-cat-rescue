import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Skeleton from "react-loading-skeleton";

import CatPage from "./CatPage.js";

function CatCard(props) {
    const [meetCat, setMeetCat] = useState(false);
    const handleClose = () => setMeetCat(false);
    const handleShow = () => setMeetCat(true);

    const [catLoaded, setCatLoaded] = useState(false);
    React.useEffect(() => {
        props.cat.name && props.cat.image ? setCatLoaded(true) : setCatLoaded(false)        
    }, [props.cat])

    
    function AgeMessage(props) {
        if (catLoaded) {
            const age = new Date().getFullYear() - props.cat.birthYear
            const ageMessage = age !== 1 ? age + " years old" : age + " year old"
            return (
                <span>
                    {ageMessage}
                </span>
            )
        } else {
            return (
                <Skeleton/>
            )
        }
    }
    

    const conditionBadge = props.cat.condition !== "none" ? (<Badge variant="secondary" className="ml-2">{props.cat.condition}</Badge>) : (<></>)
    
    
    return(
        <>
        <Card className="h-100">
            <ResponsiveEmbed aspectRatio="1by1">
                {catLoaded ? <Card.Img 
                    src={props.cat.image} 
                    alt={props.cat.name} 
                    className="catimage"    
                /> : <Skeleton />}
            </ResponsiveEmbed>
            <Card.Header className="text-center">
                {catLoaded ? <span className="d-flex justify-content-center align-items-center">
                    <h4 className="my-1">{props.cat.name}</h4>
                    {conditionBadge}
                </span> : <Skeleton width="50%" height="1.5rem"/>} 
            </Card.Header>
            <Card.Body className="text-center">
                <Container className="h-100 d-flex flex-column">
                    <Row className="my-auto">
                        <Col className="my-1" >                                            
                            {catLoaded ? props.cat.sex+" "+props.cat.info.name : <Skeleton/>}<br/>
                            <AgeMessage cat={props.cat}/> 
                        </Col>
                        <Col className="d-flex justify-content-center align-items-center">
                            <Button variant="primary" onClick={handleShow}>
                                {catLoaded ? "Meet "+props.cat.name : <Skeleton width={100}/>}
                            </Button> 
                        </Col>
                    </Row>         
                </Container>   
            </Card.Body>            
        </Card>
        <Modal 
            show={meetCat} 
            onHide={handleClose}
            size="lg"
        >
            <CatPage cat={props.cat} adoptable={props.adoptable}/>
        </Modal>
        </>
            
    )
}

export default CatCard;