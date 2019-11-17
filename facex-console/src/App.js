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
import Toggle from './component/Toggle';
import EntriesList from './EntriesList/EntriesList';
import './Entry/Entry.css';
import EntryDataService from './service/EntryDataService';

const ORGANIZATION = 'edgewalk';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entries: [
        // { id: '0', identity: 'Olivia', attempted: '3:45', location: 'front door', accepted: 'true' },
        // { id: '1', identity: 'Doug', attempted: '4:20', location: 'back door', accepted: 'true' },
        // { id: '2', identity: 'Kevin', attempted: '9:00', location: 'front door', accepted: 'false' }
      ]
    }
    this.refreshEntries = this.refreshEntries.bind(this)
  }

  componentDidMount() {
    this.refreshEntries();
    console.log('did indeed mount');
  }

  refreshEntries() {
    EntryDataService.retrieveAllEntries(ORGANIZATION) // HARDCODED
        .then(
            response => {
                console.log("response -----");
                console.log(response);
                this.setState({entries: response.data})
                console.log(this.state.entries);
            }
        )
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
    fetch('http://localhost:3000/edgewalk/liv-entries')
    .then(res => res.json())
    .then((data) => {
      // this.setState({ contacts: data })
      this.setState({ entries: data })
    })
    .catch(console.log)

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

    console.log('searchText', this.state.searchText);
    return (
      <div style={{
        backgroundColor: 'black',
      }}>
      <NavBar />
      
      <Jumbotron>
        <h1>Hello, world!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for calling
          extra attention to featured content or information.
        </p>
        <p>
          <ListEntriesComponent
          entries={this.state.entries}
          viewDetail={this.viewDetail}
          searchText={this.state.searchText}
        />
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>

      <div
        className="container"
        style={{
          backgroundColor: 'lightgrey',
        }}>
        {
          // <EntriesApp />
          // <Contacts contacts={this.state.contacts} />
        }
        {
          // <div className="App-intro">
          // <h3>Upload a file</h3>
          // <h4 style={{color: 'red'}}>{this.state.error}</h4>
          // <h4 style={{color: 'green'}}>{this.state.msg}</h4>
          // <input onChange={this.onFileChange} type="file"></input>
          // <button onClick={this.uploadFile}>Upload</button>   
          // </div>
        }
        {
          // <div className="App-intro">
          // <h3>Download a random file</h3>
          // <button onClick={this.downloadRandomImage}>Download</button>
          // </div>
        }
        <Search
          searchText={this.state.searchText}
          searchUpdate={this.searchUpdate.bind(this)} />
        {
        // <Entries entries={this.state.entries} />
 
      }

      </div>
      hello

      </div>
    );
  }
}

export default App;
