import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1 className="alert alert-warning"> FACEX </h1>
            <h1>testing</h1>
        </div>
      </Router>
    );
  }
}

export default App;