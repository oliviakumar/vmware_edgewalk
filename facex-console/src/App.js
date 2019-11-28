import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDOM, {render} from 'react-dom';
// import {Router, Route} from 'react-router';

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
import './Entry/Entry.css';
import Info from './Info/Info';
import axios from 'axios';
import Main from './Main';
// import Team from './Team/Team';
import Team from './Team/Team';
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
      // document.getElementById('button-console').addEventListener('click', () => {
      //   clicked = true;
      //   document.getElementById('banner').style.display = "none"
      //
      //   ReactDOM.render(<Main />, document.getElementById('container'));
      // });
      // document.getElementById('button-team').addEventListener('click', () => {
      //   clicked = true;
      //   document.getElementById('banner').style.display = "none"
      //   console.log(`about`);
      //
      //
      //   ReactDOM.render(<Team title={`About Team Edgewalk`} imgsrc={rpi}/>, document.getElementById('container'));
      // });
      // document.getElementById('button-project').addEventListener('click', () => {
      //   clicked = true;
      //   document.getElementById('banner').style.display = "none"
      //   console.log(`about`);
      //   ReactDOM.render(<About title={`About Project FaceX`} imgsrc={rpi}/>, document.getElementById('container'));
      // });
  }

    render() {
    // const { } = this.state;

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/logs" component={Main} />
                    <Route path="/facex" component={About} />
                    <Route path="/team" component={Team} />
                </Switch>
                {
                    // <Route path="/securityLog" component={Main} />
                }
            </Router>
            <div id="app" style={{textAlign: 'center', fontSize: '40px'}}>
                <header className="Cards" width="100%">
                    <nav>
                        <ul>
                            <a href="/"> E N T E R </a>
                            <a href="/about"> About </a>
                        </ul>
                    </nav>
                </header>
            </div>
            <div style={{textAlign: 'center'}}>
                <button> 1 </button>
                <button> 2 </button>
                <button> 3 </button>
                <br />
                <br />
            </div>
        </div>

    );
  }

}


export default App;
