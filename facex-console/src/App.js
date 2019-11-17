import React, { Component } from 'react';
import { Jumbotron, Button, Table } from 'react-bootstrap';
import './App.css';
// import EntriesApp from './component/EntriesApp';
import Search from './component/Search';
import ListEntriesComponent from './component/ListEntriesComponent';
// import Contacts from './components/Contacts';
// import Entries from './components/AllEntries';
// import Entries from './component/Entries';
import NavBar from './components/NavBar';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Entry from './Entry/Entry';
import FilterToolbar from './FilterToolbar/FilterToolbar'
import Toggle from './component/Toggle';
import './Entry/Entry.css';

class App extends Component {

  state = {
    entries: [
      // { id: '0', identity: 'Olivia', attempted: '3:45', location: 'front door', accepted: 'true' },
      // { id: '1', identity: 'Doug', attempted: '4:20', location: 'back door', accepted: 'true' },
      // { id: '2', identity: 'Kevin', attempted: '9:00', location: 'front door', accepted: 'false' }
    ],
    searchText: ''
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     contacts: [],
  //     entries: [
  //       {id: 1, content: 'first entry log', name: 'bob'},
  //       {id: 2, content: 'second entry log', name: 'doug'},
  //       {id: 2, content: 'second entry log', name: 'alex'}
  //     ],
  //     file: '',
  //     error: '',
  //     msg: '',
  //     searchText: 'hello',
  //     isLoading: ''
  //   }
  // }

  componentDidMount() {
    // fetch('http://localhost:3000/edgewalk/liv-entries')
    // .then(res => res.json())
    // .then((data) => {
    //   // this.setState({ contacts: data })
    //   this.setState({ entries: data })
    // })
    // .catch(console.log)

    // fetch('http://localhost:8080/edge/api')
    // .then(response => response.json())
    // .then(data => this.setState({beers: data, isLoading: false}));

    // this.setState({isLoading: true});
    
    // fetch('http://localhost:8080/content')
    //   .then(response => response.json())
    //   .then(data => this.setState({entries: data, isLoading: false}));
  }

  viewDetail = (id) => {
    console.log("entered view detail");
    console.log(id);
  }

  viewDetailHandler = (id) => {
    console.log('entered vdh');
    console.log(this.state.entries[id]);
    // return <Toggle entry={this.state.entries[id]} onClick={() => {this.props.viewDetail(this.state.entries[id])}} />
    
  }

  onchange = e => {
    this.setState({ search: e.target.value });
  }

  searchUpdate(value) {
    this.setState({searchText: value});
  }

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  }

  render() {
    const style = {
      backgroundColor: 'lightgrey',
      font: 'inherit',
      border: '1x solid lightblue',
      padding: 'pointer'
    };
    console.log('searchText', this.state.searchText);
    return (
      <div style={{
        backgroundColor: 'black',
      }}>
      <NavBar />


      <div
        className=""
        style={{
          backgroundColor: 'lightgrey',
        }}>

        <Search
          searchText={this.state.searchText}
          searchUpdate={this.searchUpdate.bind(this)} />
        <ListEntriesComponent
          entries={this.state.entries}
          viewDetail={this.viewDetail}
          searchText={this.state.searchText}
        />
      </div>

      </div>
    );
  }
}

export default App;
