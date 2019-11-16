import React from 'react'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Form, FormControl, Button } from 'react-bootstrap';
import logo from "../logos/facex_logo.png";
import search from "../logos/search.png";

export default function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
            <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-center"
            />
            {' FACEX || Security System'}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">


            </Nav>
            <Form inline>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>

                <FormControl type="text" placeholder="Search" />
                
                <Button variant="outline-success"> <img src={search} width="12px"/> </Button>
            </Form>
        </Navbar.Collapse>
        </Navbar>

        // className="mr-sm-2"
        // <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        // <div className="container">
        //     <a className="navbar-brand" href="Dashboard.html">
        //         FACEX || Security System
        //     </a>
        //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        //         <span className="navbar-toggler-icon" />
        //     </button>
        // </div>
        // </nav>
        
    )
}
