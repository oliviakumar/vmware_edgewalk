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
          <div style={{textAlign: 'center'}}>
  <div style={{backgroundColor: 'black'}}>
  <Row>
    <Col>1 of 3</Col>
    <Col xs={6}>2 of 3 (wider)</Col>
    <Col>3 of 3</Col>
  </Row>
  <Row>
    <Col>1 of 3</Col>
    <Col xs={5}>
        <Search searchText={this.props.searchText} searchUpdate={this.props.searchUpdate.bind(this)} />
    </Col>
    <Col>
        <Filter options={this.props.options} filterUpdate={this.props.filterUpdate.bind(this)} />

    </Col>
  </Row>
</div>
              <Row>
                <Col>

                </Col>
                <Col >
                </Col>

              </Row>
          </div>
      );
    }
}

export default FilterToolbar;
