import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import './Welcome.css';
// import App from '../App';
import Team from '../Team/Team';
import About from '../About/About';
import Main from '../Main/Main';
import Popup from '../App.js';

class Welcome extends Component {
  render () {
    return (
        <div className="Welcome">
            {
                <header>
                <nav>
                    <ul className="select" style={{color: 'white'}}>
                        <li><Link to="/team">Team</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/logs">Logs</Link></li>
                        <li><Link to="/status">Status</Link></li>
                    </ul>
                </nav>
            </header>
            }

            {/* <Route path="/" exact render={() => <h1>Home</h1>} />
            <Route path="/" render={() => <h1>Home 2</h1>} /> */}
            <Route path="/team" exact component={Team} />
            <Route path="/about" exact component={About} />
            <Route path="/logs" exact component={Main} />
            <Route path="/status" exact component={Popup} />
        </div>
    );
  }
}

export default Welcome;
