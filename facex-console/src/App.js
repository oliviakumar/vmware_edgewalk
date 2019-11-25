import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import ViewDetail from "./component/ViewDetail";
import { Jumbotron, Button, Table, Panel, OverlayTrigger, Popover } from 'react-bootstrap';
import './App.css';
// import EntriesApp from './component/EntriesApp';
import Search from './component/Search';
import ListEntriesComponent from './component/ListEntriesComponent';
// import Contacts from './components/Contacts';
// import Entries from './components/AllEntries';
// import Filter from './component/Filter';
import NavBar from './components/NavBar';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Entry from './Entry/Entry';
import FilterToolbar from './FilterToolbar/FilterToolbar'
import Toggle from './component/Toggle';
import ViewEntry from './SidePanel/ViewEntry';
import SidePanel from './SidePanel/SidePanel';
import './Entry/Entry.css';
import Info from './Info/Info';


function renderImage(host, id) {
  const c = host + id
  return (
      <img src={c} />
    );
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entries: [
              // { id: '0', identity: 'Olivia', attempted: '3:45', location: 'front door', accepted: 'true' },
              // { id: '1', identity: 'Doug', attempted: '4:20', location: 'back door', accepted: 'true' },
              // { id: '2', identity: 'Kevin', attempted: '9:00', location: 'x', accepted: 'false' }
            ],
            searchText: '',
            filterText: '',
            basicFilterText: '',
            error: null,
            isLoaded: false,
            response: [],
            content: [],
            fetchId: ''
        };
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
      const fetchUrl = "http://localhost:8080/" + this.state.fetchId;
      fetch(fetchUrl)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(`result:`, result);
            this.setState({
              isLoaded: true,
              response: result
            });
          },
          (error) => {
              console.log('erroneous');
            this.setState({
              isLoaded: true,
              error
            });
          }
        )

      // fetch("http://localhost:8080/entries")
      //   .then(res => res.json())
      //   .then(
      //     (result) => {
      //         console.log('result-');
      //         console.log(result);
      //         this.setState({
      //             isLoaded: true,
      //             response: result,
      //       });
      //     },
      //     (error) => {
      //       console.log('error2');
      //       this.setState({
      //         isLoaded: true,
      //         error
      //       });
      //     }
      //   )

/*
      fetch("http://localhost:8080/content")
        .then(res => res.json())
        .then(
          (result) => {
              console.log('content-');
              console.log(result);
              this.setState({
                  content: result,
            });
          },
          (error) => {
            console.log('no content');
            this.setState({
              error
            });
          }
        )
*/
      //
      // fetch("http://localhost:8080/5dd59b4cefe3b7861de13556")
      //   .then(res => res.json())
      //   .then(
      //     (result) => {
      //         console.log('result-');
      //         console.log(result);
      //         this.setState({
      //             isLoaded: true,
      //             response: result,
      //       });
      //     },
      //     (error) => {
      //       console.log('error2');
      //       this.setState({
      //         isLoaded: true,
      //         error
      //       });
      //     }
      //   )

    // fetch('http://localhost:3000/edgewalk/liv-entries')
    // .then(res => res.json())
    // .then((data) => {
    //   // this.setState({ contacts: data })
    //   this.setState({ entries: data })
    // })
    // .catch(console.log)
    //
    // fetch('http://localhost:8080/edge/api')
    // .then(response => response.json())
    // .then(data => this.setState({beers: data, isLoading: false}));
    //
    // this.setState({isLoading: true});
    //
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
    /*     const panelInstance = (
          <Panel onClick={()=>alert('It works')}>
            Basic panel example
          </Panel>
        );

        React.render(panelInstance, mountNode); */
    // const popover = (
    //   <Popover id="popover-basic">
    //     <Popover.Title as="h3">Popover right</Popover.Title>
    //     <Popover.Content>
    //       And here's some <strong>amazing</strong> content. It's very engaging.
    //       right?
    //     </Popover.Content>
    //   </Popover>
    // );
    //
    // const Example = () => (
    //   <OverlayTrigger trigger="click" placement="right" overlay={popover}>
    //     <Button variant="success">Click me to see</Button>
    //   </OverlayTrigger>
    // );
    // return <Example />

    // ReactDom.render(<Example />);
  }

  onchange = e => {
    this.setState({ search: e.target.value });
  }

  searchUpdate(value) {
    this.setState({searchText: value});
  }

  filterUpdate(value) {
    console.log(`Appjs filter update:`, value);
    this.setState({filterText: value});
  }

  basicFilterUpdate(value) {
      const val = this.myValue.value;
      console.log(`Appjs basic filter update:`, val);
      this.setState({basicFilterText: value});
  }

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  }

  render() {
    const { error, isLoaded, response } = this.state;

    const style = {
      backgroundColor: 'lightgrey',
      font: 'inherit',
      border: '1x solid lightblue',
      padding: 'pointer'
    };
    console.log('searchText', this.state.searchText);
    console.log('response');
    console.log(this.state.response);

    return (
      <div style={{
        backgroundColor: 'black',
        height: '500px'
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
            <SidePanel />
            <ViewEntry />
            // {renderImage('http://localhost:8080/files/', '5dd5a21befe3b78e670e39ba')}
            <ListEntriesComponent
              entries={this.state.response}
              viewDetail={this.viewDetail}
              searchText={this.state.searchText}
              filterText={this.state.filterText}
              filterUpdate={this.filterUpdate.bind(this)}
              basicFilterUpdate={this.basicFilterUpdate.bind(this)} />
          </div>
          <p> hi </p>
          <div>
            {console.log(`this.state.response: `, this.state.response[0])}
            {renderImage('http://localhost:8080/files/', this.state.response)}
          </div>
      </div>
    );
  }
}

export default App;
