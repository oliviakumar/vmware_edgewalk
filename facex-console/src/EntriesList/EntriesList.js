import React, { Component } from 'react';
import EntryDataService from '../service/EntryDataService';
// import Toggle from '../Toggle';
import { Jumbotron, Button, Table } from 'react-bootstrap';

import Entry from '../Entry/Entry';
import FilterToolbar from '../FilterToolbar/FilterToolbar'


const ORGANIZATION = 'edgewalk';

class EntriesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entries: [{id: 1, content: 'first entry log', name: 'bob'},
            {id: 2, content: 'second entry log', name: 'doug'},
            {id: 2, content: 'second entry log', name: 'alex'}],
            message: null,
            imgpath: '',
        }
        this.refreshEntries = this.refreshEntries.bind(this)
    }

    componentDidMount() {
        this.refreshEntries();
    }

    refreshEntries() {
        EntryDataService.retrieveAllEntries(ORGANIZATION) // HARDCODED
            .then(
                response => {
                    console.log("response -----");
                    // console.log(response.data[0]);
                    // this.setState({entries: response.data});
                    console.log("this.state.entries -----");

                    console.log(this.props.entries);
                }
            )
    }

    render() {
        const style = {
            backgroundColor: 'lightpink',
            font: 'inherit',
            border: '1x solid lightblue',
            padding: 'pointer'
        };
        return (<p>
        <Table bordered hover>
        <thead>
          <td colspan="5"><FilterToolbar /></td>
          <tr className="Entry">
            <th>#</th>
            <th>Name</th>
            <th>Location</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="collapse in" style={style}>
            {this.state.entries
              .map(entry => {
                console.log('entry');
                console.log(entry);
                return <Entry
                  
                click={() => this.viewDetailHandler(entry.id)}
                id={entry.id}
                identity={entry.identity}
                attempted={entry.attempted} 
                location={entry.location}
                accepted={entry.accepted}
                
                />                
               
              }

              )
            }
        </tbody>
      </Table>
    </p>
    )}
}

export default EntriesList;