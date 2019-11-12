import React, { Component } from 'react';
import './App.css';
import EntriesApp from './component/EntriesApp';

class App extends Component {
  render() {
    return (
      <div className="container">
        <EntriesApp />
      </div>
    );
  }
}

export default App;
