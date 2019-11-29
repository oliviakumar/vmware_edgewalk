
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ReactDOM, {render} from 'react-dom';
import { Navbar, Container } from 'react-bootstrap';
import Main from '../Main';
import Team from '../Team/Team';
import About from '../About/About';

// import {Router, Route} from 'react-router';
import { Row } from 'reactstrap'

const verypretentious = () => (
    <div id="verypretentious" fixed="bottom">
        <Router>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/logs" component={Main} />
                <Route path="/about" component={About} />
                <Route path="/team" component={Team} />
            </Switch>
            <Container id="dude" style={{textAlign: 'center', backgroundColor: 'transparent'}}>
                <div>
                    <li className="nav-links">
                        <Link id="veryimportant" to='/team'>
                            <li className="btn btn-outline-light bro" id="button-team" > Meet Team Edgewalk </li>
                        </Link>

                        <Link id="veryimportant" to='/about'>
                        <li className="btn btn-outline-light bro" id="button-project"> About Project FaceX </li>
                        </Link>
                    </li>
                </div>
            </Container>

        </Router>
    </div>
);

export default verypretentious;
