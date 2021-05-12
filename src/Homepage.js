import './css/App.css';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Homepage() {
    return(
        <Container>
            <Row>
                <Col>
                    <h1>
                        Kilobyte Cat Rescue
                    </h1>
                </Col>
            </Row>
        </Container>
    )
}

export default Homepage;