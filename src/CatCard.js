import Card from "react-bootstrap/Card";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CatCard(props) {
    
    const age = new Date().getFullYear() - props.cat.birthYear
    const ageMessage = age !== 1 ? age + " years old" : age + " year old"

    const conditionBadge = props.cat.condition !== "none" ? (<Badge variant="secondary">{props.cat.condition}</Badge>) : (<></>)
    
    return(
        <Card>
            <ResponsiveEmbed aspectRatio="1by1">
                <Card.Img 
                    src={props.cat.image} 
                    alt={props.cat.name} 
                    className="catimage"    
                />
            </ResponsiveEmbed>
            <Card.Header className="text-center">
                <Container>
                    <Row>
                        <Col>
                            <span className="d-flex justify-content-center align-items-center">
                                <h4 className="my-auto mr-1">{props.cat.name}</h4>
                                <small>{conditionBadge}</small>
                            </span>                 
                            {props.cat.sex} {props.cat.info.name}<br/>
                            {ageMessage}  
                        </Col>
                        <Col className="d-flex justify-content-center align-items-center">
                            <Button variant="primary">
                                Meet {props.cat.name}
                            </Button> 
                        </Col>
                    </Row>         
                </Container>   
            </Card.Header>            
        </Card>
            
    )
}

export default CatCard;