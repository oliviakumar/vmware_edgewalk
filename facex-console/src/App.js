import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ReactDOM, {render} from 'react-dom';
import { Navbar, Container, Modal } from 'react-bootstrap';
import StatusPopup from './StatusPopup/StatusPopup';
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
import Entry from './Entry/Entry';
import FilterToolbar from './FilterToolbar/FilterToolbar'
import Toggle from './component/Toggle';
import ViewEntry from './SidePanel/ViewEntry';
import SidePanel from './SidePanel/SidePanel';
import Info from './Info/Info';
import axios from 'axios';
import Main from './Main/Main';
import Team from './Team/Team';
import About from './About/About';
import Footer from './Footer/Footer';
import logo from "./facex.png";
import VeryPretentiousComponent from "./VeryPretentious/VeryPretentious";
import Welcome from "./Welcome/Welcome";

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

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


class App extends Component {

    constructor(props) {
        super();
        this.state = {
            openModal: false
        }
        this.handleOpenModel = this.handleOpenModel.bind(this);
        this.handlModelClose = this.handlModelClose.bind(this);
    }

    handleOpenModel() {
        this.setState({
            openModal: true,
        })
    }

    handlModelClose() {
        this.setState({
            openModal: false,
        })
    }


    componentDidMount() {
        document.getElementById('button-console').addEventListener('click', () => {
//button-console
        clicked = true;
        document.getElementById('banner').style.display = "none"
        ReactDOM.render(<StatusPopup />, document.getElementById('container'));
        // ReactDOM.render(<Main />, document.getElementById('container'));
        // ReactDOM.render(<Main />, document.getElementById('root'));


      });
        document.getElementById('button-enter').addEventListener('click', () => {
        clicked = true;
        // console.log('clicked enter in appjs')
        document.getElementById('banner').style.display = "none";
        // <button >Open Modal</button>
        this.handleOpenModel();
        // ReactDOM.render(<Example />, document.getElementById('container'));
        // ReactDOM.render(<StatusPopup id={'button-enter'}/>, document.getElementById('container'));

      });
      // document.getElementById('button-team').addEventListener('click', () => {
      //   clicked = true;
      //   document.getElementById('veryimportant').style.display = "none"
      //   console.log(`about`);
      //
      //
      //   ReactDOM.render(<Team title={`About Team Edgewalk`} />, document.getElementById('container'));
      //
      // });
      // document.getElementById('button-project').addEventListener('click', () => {
        // clicked = true;
        // document.getElementById('veryimportant').style.display = "none"
      // });
      //   document.getElementById('banner').style.display = "none"
      //   console.log(`about`);
      //   ReactDOM.render(<About title={`About Project FaceX`} imgsrc={rpi}/>, document.getElementById('container'));
      //
      // });
  }
    render() {
    // const { } = this.state;

    return (
        <Router>
            <div className="App" >
                <Welcome id="welcome"/>
                <Example />

                <Footer title={"hi"}/>
                {
                // <VeryPretentiousComponent/>
                // <button id="button-enter" onClick={this.handleOpenModel}>Open Modal</button>

                }

                <div
                    id="myModal"
                    className="modal"
                    style={{ display: this.state.openModal ? 'block' : 'none' }}>
                    <div className="modal-content">
                        <span className="close" onClick={this.handlModelClose}>&times;</span>
                        <p>Some text in the Modal...</p>
                    </div>

                </div>
            </div>
        </Router>
    );
  }
}

export default App;
// <img src={rpi} height="100px" width="150px" style={{opacity: 0.5}}/>
// <img
//     src={rpi} width="100px"
//     onMouseOver={e => (e.currentTarget.src = logo)}
// />
