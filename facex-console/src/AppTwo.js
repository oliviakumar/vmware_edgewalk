import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import ViewDetail from "./component/ViewDetail";
import { Jumbotron, Button, Table, Panel, OverlayTrigger, Popover } from 'react-bootstrap';
// import './App.css';

function showDiv() {
  console.log('show div');
  document.getElementById('welcomeDiv').style.display = "block";
}

class AppTwo extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

  componentDidMount() {
      console.log('cdm');
  }

  render() {
    const { error, isLoaded, response } = this.state;


    return (
        <div>

        <button onClick={showDiv}> click me </button>

        </div>

    );
  }
}

export default AppTwo;
