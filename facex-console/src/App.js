import React, { Component } from 'react';
import './App.css';
import EntriesApp from './component/EntriesApp';
import ListEntriesComponent from './component/ListEntriesComponent';

class App extends Component {
  render() {
    return (
      <div className="container">
        <EntriesApp />
        <ListEntriesComponent />
      </div>
    );
  }
}

export default App;
