import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  Route,
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

const ORGANIZATION = 'edgewalk'
const ORG_API_URL = 'http://localhost:8080'
// const Temp = () => (
//   <p>Mounted!</p>
// );

const left = document.querySelector('.left');
const container = document.querySelector('.container');


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


  componentDidMount() {
      document.getElementById('button-root').addEventListener('click', () => {
        ReactDOM.render(<Main />, document.getElementById('container'));
      });



  }

    render() {
    // const { } = this.state;

    return (
        <div id="app">
            <header class="masthead" width="100%">
            <div class="container">
            <div class="intro-text">
              <button id="button-root"> Read More </button>

              <a class="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#services">Tell Me More</a>
            </div>
            </div>
            </header>

            <br />
            <br />

        </div>
    );
  }

}


export default App;
