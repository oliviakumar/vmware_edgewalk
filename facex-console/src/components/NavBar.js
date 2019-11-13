import React from 'react'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Form, FormControl, Button } from 'react-bootstrap';

export default function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home"> <img src="vmware_edgewalk/facex-console/src/logos/facex_logo.png" width="30" height="30"/> FACEX || Security System </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
            </Form>
        </Navbar.Collapse>
        </Navbar>
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
