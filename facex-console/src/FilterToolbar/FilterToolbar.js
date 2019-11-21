import React, { useState } from 'react';
import { Button, CardBody, Card, Container } from 'reactstrap';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Form, FormControl } from 'react-bootstrap';
import Filter from '..//Filter/Filter';

const FilterToolbar = (props) => {
    // console.log('props.options')
    // console.log(props.options)
    props.options.map(option => {
        // console.log(option.location);
    })

  return (
    <Navbar variant="light" bg="light">
        <Filter options={props.options}/>
    </Navbar>
  );
}

export default FilterToolbar;
