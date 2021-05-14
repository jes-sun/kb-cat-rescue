import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";

function CatPage(props) {
    const cat = props.location.state.cat

    const age = new Date().getFullYear() - cat.birthYear
    const ageMessage = age !== 1 ? age + " years old" : age + " year old"

    const conditionBadge = cat.condition !== "none" ? (<Badge variant="secondary">{cat.condition}</Badge>) : (<></>)
    
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

    let history = useHistory()
    function backButton() {
        history.goBack()
    }

    return( 
        <Container>
            <Row>
                <Col xs={12} md={6}>
                    <img src={cat.image} alt={cat.name} width="100%"/>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <span className="d-flex justify-content-center align-items-center">
                                <h1 className="my-auto mr-1">{cat.name}</h1>
                                {conditionBadge}
                            </span>                            
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <h6>{cat.sex} {cat.info.name}, {ageMessage}</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center mb-2">
                            <em>{cat.info.temperament}</em>
                        </Col>
                    </Row>
                    <Row>                        
                        <Col>
                            <p>{cat.info.description}</p>
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
            <Row>
                <Col className="my-3 d-flex justify-content-end">
                    <Button className="mx-1" variant="secondary" onClick={backButton}>
                        Back
                    </Button>
                    <Button className="mx-1" variant="success">
                        Adopt {cat.name} 
                    </Button> 
                </Col>
            </Row>
        </Container>
    )
}

export default CatPage;