import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import logo from "./images/logo.png";

function MyNavbar() {
    return (
        <Navbar expand="sm" collapseOnSelect className="justify-content-around">
            <Navbar.Brand href="/">
                <img src={logo} alt="Kilobyte Cat Rescue" height="50em"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/cats">
                        Adopt
                    </Nav.Link>
                    <Nav.Link>
                        My Account
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link>
                        About
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default MyNavbar;