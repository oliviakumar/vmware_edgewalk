import React, { Component } from 'react';
import './App.css';
import EntriesApp from './component/EntriesApp';
import Search from './component/Search';
import ListEntriesComponent from './component/ListEntriesComponent';
import Contacts from './components/Contacts';
// import Entries from './components/AllEntries';
import Entries from './component/Entries';
import NavBar from './components/NavBar';

class App extends Component {
  state = {
    contacts: [],
    entries: [
      {id: 1, content: 'first entry log'},
      {id: 2, content: 'second entry log'},
    ],
    file: '',
    error: '',
    msg: '',
    searchText: '',
    isLoading: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/edgewalk/liv-entries')
    .then(res => res.json())
    .then((data) => {
      // this.setState({ contacts: data })
      this.setState({ entries: data })
    })
    .catch(console.log)

    // this.setState({isLoading: true});
    
    // fetch('http://localhost:8080/content')
    //   .then(response => response.json())
    //   .then(data => this.setState({entries: data, isLoading: false}));
  }

  viewDetail = (id) => {
    console.log(id);
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

  uploadFile = (event) => {
      event.preventDefault();
      this.setState({error: '', msg: ''});
  
      if(!this.state.file) {
        this.setState({error: 'Please upload a file.'})
        return;
      }
  
      if(this.state.file.size >= 2000000) {
        this.setState({error: 'File size exceeds limit of 2MB.'})
        return;
      }
  
      let data = new FormData();
      data.append('file', this.state.file);
      data.append('name', this.state.file.name);
  
      fetch('http://localhost:8080/api/files', {
        method: 'POST',
        body: data
      }).then(response => {
        this.setState({error: '', msg: 'Sucessfully uploaded file'});
      }).catch(err => {
        this.setState({error: err});
      });
  
  }

  downloadRandomImage = () => {
    fetch('http://localhost:8080/api/files')
      .then(response => {
        const filename =  response.headers.get('Content-Disposition').split('filename=')[1];
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
      });
   });
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
          searchUpdate={this.searchUpdate.bind(this)}
          searchText={this.state.searchText} />
        {
        // <Entries entries={this.state.entries} />
        }
        <ListEntriesComponent
          entries={this.state.entries} viewDetail={this.viewDetail} />
      </div>
    );
  }
}

export default App;
