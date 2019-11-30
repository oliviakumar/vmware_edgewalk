import React, { useState, Component } from 'react';
// import { Button, CardBody, Card, Container, Row, Col } from 'reactstrap';
import { Container, Navbar, NavItem, NavDropdown, MenuItem, Nav, Form, FormControl, Row, Col } from 'react-bootstrap';
import Filter from '../Filter/Filter';
import Search from '../component/Search';

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
          <div style={{textAlign: 'right'}}>
            <Filter options={this.props.options} filterUpdate={this.props.filterUpdate.bind(this)} />
            <Search searchText={this.props.searchText} searchUpdate={this.props.searchUpdate.bind(this)} />
            <br/>
          </div>
      );
    }
}

export default FilterToolbar;
