import React, { Component } from 'react';
import './App.css';
import EntriesApp from './component/EntriesApp';
import ListEntriesComponent from './component/ListEntriesComponent';
import Contacts from './components/Contacts';
import Entries from './components/AllEntries';
import NavBar from './components/NavBar';

class App extends Component {
  state = {
    contacts: [],
    entries: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/edgewalk/liv-entries')
    .then(res => res.json())
    .then((data) => {
      // this.setState({ contacts: data })
      this.setState({ entries: data })
    })
    .catch(console.log)
  }

  render() {
    return (
      <div
        className="container"
        style={{
          backgroundColor: 'lightgrey',
        }}>
        <NavBar />
        {
          // <EntriesApp />
          // <Contacts contacts={this.state.contacts} />
        }
        
        <Entries entries={this.state.entries} />
        <ListEntriesComponent />
      </div>
    );
  }
}

export default App;
