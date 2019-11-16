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
import Toggle from './component/Toggle';

class App extends Component {

  state = {
    entries: [
      { id: '0', identity: 'Olivia', attempted: '3:45', location: 'front door', accepted: 'true' },
      { id: '1', identity: 'Doug', attempted: '4:20', location: 'back door', accepted: 'true' },
      { id: '2', identity: 'Kevin', attempted: '9:00', location: 'front door', accepted: 'false' }
    ]
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
    return <Toggle entry={this.state.entries[id]} onClick={() => {this.props.viewDetail(this.state.entries[id])}} />
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

  // uploadFile = (event) => {
  //     event.preventDefault();
  //     this.setState({error: '', msg: ''});
  
  //     if(!this.state.file) {
  //       this.setState({error: 'Please upload a file.'})
  //       return;
  //     }
  
  //     if(this.state.file.size >= 2000000) {
  //       this.setState({error: 'File size exceeds limit of 2MB.'})
  //       return;
  //     }
  
  //     let data = new FormData();
  //     data.append('file', this.state.file);
  //     data.append('name', this.state.file.name);
  
  //     fetch('http://localhost:8080/api/files', {
  //       method: 'POST',
  //       body: data
  //     }).then(response => {
  //       this.setState({error: '', msg: 'Sucessfully uploaded file'});
  //     }).catch(err => {
  //       this.setState({error: err});
  //     });
  
  // }

  // downloadRandomImage = () => {
  //   fetch('http://localhost:8080/edge/image')
  //     .then(response => {
  //       const filename =  response.headers.get('Content-Disposition').split('filename=')[1];
  //       console.log(filename);
  //       response.blob().then(blob => {
  //         let url = window.URL.createObjectURL(blob);
  //         let a = document.createElement('a');
  //         a.href = url;
  //         a.download = filename;
  //         a.click();
  //     });
  //  });
  // }

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
        <Table striped bordered hover>
{

}
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Location</th>
      <th>Time</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
      {this.state.entries
        .map(entry => {
          // console.log(entry);
          
          return  <Entry
            click={() => this.viewDetailHandler(entry.id)}
            id={entry.id}
            identity={entry.identity}
            attempted={entry.attempted} 
            location={entry.location}
            accepted={entry.accepted}/>
            

        })}
        
  </tbody>
</Table>
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
        <ListEntriesComponent
          entries={this.state.entries}
          viewDetail={this.viewDetail}
          searchText={this.state.searchText}
        />
      </div>
      hello

      </div>
    );
  }
}

export default App;
