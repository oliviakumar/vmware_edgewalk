import React, { useState, Component } from 'react';
import { Button, CardBody, Card, Container, Row } from 'reactstrap';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Form, FormControl } from 'react-bootstrap';
import Filter from '../Filter/Filter';

// const FilterToolbar = (props) => {
class FilterToolbar extends Component {
    // console.log('props.options')
    // console.log(props.options)
    // this.props.options.map(option => {
        // console.log(option.location);
    // })
    //
    filterUpdate(query) {
        console.log('reached filterUpdate FilterToolbar');

        // const val = this.myValue.value;
        // console.log(val);
        console.log(query);

        // this.props.filterUpdate(val);
    }

    render() {
      return (
        <Navbar variant="light" bg="light">
            <Filter options={this.props.options} basicFilterUpdate={this.props.basicFilterUpdate.bind(this)} filterUpdate={this.props.filterUpdate.bind(this)} />
        </Navbar>
      );
    }
}

export default FilterToolbar;
