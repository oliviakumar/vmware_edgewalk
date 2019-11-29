import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ReactDOM, {render} from 'react-dom';
// import {Router, Route} from 'react-router';
import { Row } from 'reactstrap'

import {
  // Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import ViewDetail from "./component/ViewDetail";
import { Jumbotron, Button, Table, Panel, OverlayTrigger, Popover } from 'react-bootstrap';
import './App.css';
// import EntriesApp from './component/EntriesApp';
import Search from './component/Search';
import ListEntriesComponent from './component/ListEntriesComponent';
// import Contacts from './components/Contacts';
// import Entries from './components/AllEntries';
// import Filter from './component/Filter';
import NavBar from './components/NavBar';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Entry from './Entry/Entry';
import FilterToolbar from './FilterToolbar/FilterToolbar'
import Toggle from './component/Toggle';
import ViewEntry from './SidePanel/ViewEntry';
import SidePanel from './SidePanel/SidePanel';
// import './Entry/Entry.css';
import Info from './Info/Info';
import axios from 'axios';
import Main from './Main';
// import Team from './Team/Team';
import Team from './Team/Team';
import Footer from './Footer/Footer';
import About from './About/About';
import rpi from "./rpi.jpg";

const ORGANIZATION = 'edgewalk'
const ORG_API_URL = 'http://localhost:8080'
// const Temp = () => (
//   <p>Mounted!</p>
// );

const left = document.querySelector('.left');
const container = document.querySelector('.container');
var clicked = false;

const TypeWriter = function(txtElement, words, wait = 200) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// type method
TypeWriter.prototype.type = function() {
    const curr = this.wordIndex % this.words.length;
    const fulltxt = this.words[curr];
    console.log(fulltxt);

    let typeSpeed = 75;

    if(this.isDeleting) {
        this.txt = fulltxt.substring(0, this.txt.length-1);
        // typeSpeed /= 2;
    } else {
        this.txt = fulltxt.substring(0, this.txt.length+1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

    // let typeSpeed = 300;

    if(this.isDeleting) {
        typeSpeed /= 2;
    }

    if(!this.isDeleting && this.txt === fulltxt) {
        // pause
        typeSpeed = this.wait;

        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;

        // pause
        typeSpeed = 100;

    }

    if (clicked !== true) {
        setTimeout(() => this.type(), typeSpeed)
    }
}


// init on DOM loadAsResource
document.addEventListener('DOMContentLoaded', init);

// init app
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // init twriter
    new TypeWriter(txtElement, words, wait);
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

  componentDidMount() {
      document.getElementById('button-console').addEventListener('click', () => {

        clicked = true;
        document.getElementById('banner').style.display = "none"
        ReactDOM.render(<Main />, document.getElementById('container'));
        // ReactDOM.render(<Main />, document.getElementById('root'));


      });
      // document.getElementById('button-team').addEventListener('click', () => {
      //   clicked = true;
      //   document.getElementById('banner').style.display = "none"
      //   console.log(`about`);
      //
      //
      //   ReactDOM.render(<Team title={`About Team Edgewalk`} />, document.getElementById('container'));
      //
      // });
      // document.getElementById('button-project').addEventListener('click', () => {
      //   clicked = true;
      //   document.getElementById('banner').style.display = "none"
      //   console.log(`about`);
      //   ReactDOM.render(<About title={`About Project FaceX`} imgsrc={rpi}/>, document.getElementById('container'));
      //
      // });
  }

  renderFaceX() {
      return (<About title={`About Project FaceX`} imgsrc={rpi}/>);
  }
  renderTeam() {
      return (<Team title={`About Team Edgewalk`} />);
  }

    render() {
    // const { } = this.state;

    return (
        <div>
        {
                // <Router>
                //         <Row style={{textAlign: 'center'}}>
                //
                //             <Route path="/facex" component={this.renderFaceX} />
                //
                //             <Route path="/team" component={this.renderTeam} />
                //         </Row>
                // </Router>

        }
            <Router>
                <Switch>
                    <Route path="/logs" component={Main} />
                    <Route path="/about" component={About} />
                    <Route path="/team" component={Team} />
                </Switch>
                {
                    // <Route path="/securityLog" component={Main} />
                }
            <nav>
                {
                    //<h3> LOGO </h3>
                }
                <ul className="nav-links">
                    <Link to='/team'>
                        <li className="btn btn-outline-light" id="button-team"> Meet Team Edgewalk </li>
                    </Link>
                    <span />
                    <Link to='/facex'>
                        <li className="btn btn-outline-light" id="button-project"> About Project FaceX </li>
                    </Link>
                </ul>
            </nav>
            </Router>
            <Footer title={"hi"}/>
            

        </div>

    );
  }

}


export default App;
