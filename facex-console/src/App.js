import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"
import NavBar from "./components/NavBar";
import Entries from "./components/Entries";
import {BrowserRouter as Router, Route} from "react-router-dom";
import AddNewEntry from "./components/EntryStatusResponse/AddNewEntry";
// import UpdateNewEntry from "./components/EntryStatusResponse/UpdateNewEntry";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1 className="alert alert-warning"> FACEX </h1>
            <NavBar />
            <Route exact path="/" component={Entries} />

            
            <Route exact path="/addNewEntry" component={AddNewEntry} />
            {
              // <Route exact path="/updateNewEntry" component={UpdateNewEntry} />
            }
        </div>
      </Router>
    );
  }
}

export default App;