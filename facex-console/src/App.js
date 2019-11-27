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
const Temp = () => (
  <p>Mounted!</p>
);

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

  componentDidMount() {
      console.log(`testing 123`);
      document.getElementById('button-root').addEventListener('click', () => {
        ReactDOM.render(<Main />, document.getElementById('app'));
      });

  }

  onClick() {
      console.log(`returning main`);
      return <div> <Main /> </div>;
  }




    render() {
    // const { } = this.state;

    return (
        <div id="app">
            <button id="button-root"> hi </button>
        </div>
    );
  }

}


export default App;
