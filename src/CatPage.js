import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import Modal from "react-bootstrap/Modal";

function CatPage(props) {
    const cat = props.cat

    const age = new Date().getFullYear() - cat.birthYear
    const ageMessage = age !== 1 ? age + " years old" : age + " year old"

    const conditionBadge = cat.condition !== "none" ? (<Badge variant="secondary">{cat.condition}</Badge>) : (<></>)

    let history = useHistory()
    function adopt() {
        history.push("/adopt", {cat:cat})
    }

    function percent(trait) {
        return 100*(trait/5)
    }

    function TraitBar(props) {
        return(
            <div className="my-1">
                <small>{props.name}</small>
                <ProgressBar 
                    now={percent(props.trait)}
                    label={percent(props.trait)+"%"}
                />
            </div>
        )
    }

    function AdoptButton() {
        if (props.adoptable === "true") {
            return(
                <Button className="mx-1" variant="success" onClick={adopt}>
                    Adopt {cat.name} 
                </Button> 
            )
        } else {
            return(<></>)
        }   
    }
    
    function Description() {
        if (props.adoptable === "true") {
            return(
                <>
                <p>{cat.info.description}</p>
                <p>Adopt {cat.name} today!</p>
                </>
            )
        } else {
            return(<p>{cat.info.description}</p>)
        } 
    }
    return( 
        <Container>
            <Modal.Header className="mb-1" closeButton>
                <Row className="ml-auto">
                    <Col className="d-flex flex-column align-items-center">
                        <span className="d-flex align-items-center">
                            <h1 className="my-auto mr-1">{cat.name}</h1>
                            {conditionBadge}
                        </span>   
                        <h6>{cat.sex} {cat.info.name}, {ageMessage}</h6>                       
                    </Col>
                </Row>
                
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xs={12} lg={6} className="d-flex align-items-center">
                        <img src={cat.image} alt={cat.name} width="100%" style={{borderRadius:"5px"}}/>
                    </Col>
                    <Col>
                        <Row>
                            <Col className="text-center mb-2">
                                <em>{cat.info.temperament}</em>
                            </Col>
                        </Row>
                        <Row>                        
                            <Col>
                                <Description/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <TraitBar name="Social Needs" trait={cat.info.social_needs}/>
                        <TraitBar name="Affection Level" trait={cat.info.affection_level}/>
                        <TraitBar name="Child Friendly" trait={cat.info.child_friendly}/>
                        <TraitBar name="Dog Friendly" trait={cat.info.dog_friendly}/>
                        <TraitBar name="Stranger Friendly" trait={cat.info.stranger_friendly}/>
                        
                    </Col>
                    <Col>
                        <TraitBar name="Intelligence" trait={cat.info.intelligence}/>
                        <TraitBar name="Energy Level" trait={cat.info.energy_level}/>
                        <TraitBar name="Vocalization" trait={cat.info.vocalisation}/>
                        <TraitBar name="Shedding Level" trait={cat.info.shedding_level}/>
                        <TraitBar name="Grooming" trait={cat.info.grooming}/>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <AdoptButton/>
            </Modal.Footer>
        </Container>
    )
}

export default CatPage;