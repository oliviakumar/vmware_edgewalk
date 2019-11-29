import React, { useState, Component } from 'react';
import { Button, CardBody, Card, Container, Row, Col } from 'reactstrap';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Form, FormControl } from 'react-bootstrap';
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
          <div>
              <Row style={{backgroundColor: 'black', textAlign: 'center'}}>
                <Col sm={{ size: 'auto', offset: 1 }}>
                    <Search searchText={this.props.searchText} searchUpdate={this.props.searchUpdate.bind(this)} />
                </Col>
                <Col sm={{ size: 'auto', offset: 1 }}>
                    <Filter options={this.props.options} filterUpdate={this.props.filterUpdate.bind(this)} />
                </Col>

              </Row>
          </div>
      );
    }
}

export default FilterToolbar;
