import Card from "react-bootstrap/Card";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

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
            <span className="d-flex justify-content-center align-items-center">
                <h4 className="my-auto mr-1">{props.cat.name}</h4>
                <small>{conditionBadge}</small>
            </span>
                 
                {props.cat.sex} {props.cat.info.name}<br/>
                {ageMessage}               
            </Card.Header>
            <Card.Body className="d-flex justify-content-center">
                <Button variant="primary">
                    Meet {props.cat.name}
                </Button>       
            </Card.Body>
            
        </Card>
            
    )
}

export default CatCard;