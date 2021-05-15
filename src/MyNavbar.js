import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import logo from "./images/logo.png";

function MyNavbar() {
    return (
        <Navbar sticky="top" expand="sm" collapseOnSelect className="justify-content-around">
            <Navbar.Brand href="/">
                <img src={logo} alt="Kilobyte Cat Rescue" height="50em"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className="mx-4" href="/cats">
                        Adopt
                    </Nav.Link>
                    <Nav.Link className="mx-4">
                        My Account
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link className="mx-4">
                        About
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default MyNavbar;