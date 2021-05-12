import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function MyNavbar() {
    return (
        <Navbar collapseOnSelect expand="sm" className="justify-content-around">
            <Navbar.Brand href="/">
                kB Cat Rescue
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link>
                        Our Cats
                    </Nav.Link>
                    <Nav.Link>
                        About Us
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link>
                        My Account
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default MyNavbar;