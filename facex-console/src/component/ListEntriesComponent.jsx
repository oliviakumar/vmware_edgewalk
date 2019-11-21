import React, { Component, Link } from 'react';
import {Route, IndexRoute} from 'react-router';

import EntryDataService from '../service/EntryDataService';
import Toggle from './Toggle';
import ViewDetail from './ViewDetail';
import { Jumbotron, Button, Table } from 'react-bootstrap';
import FilterToolbar from '../FilterToolbar/FilterToolbar'
import Entry from '../Entry/Entry'
import '../Entry/Entry.css';
import '../App.css';

const ORGANIZATION = 'edgewalk';

class ListEntriesComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entries: [
                { id: '0', identity: 'Olivia', attempted: '3:45', location: 'front door', accepted: 'true' },
      { id: '1', identity: 'Doug', attempted: '4:20', location: 'back door', accepted: 'true' },
      { id: '2', identity: 'Kevin', attempted: '9:00', location: 'front door', accepted: 'false' }
            ],
            message: null,
            imgpath: '',
        }
        this.refreshEntries = this.refreshEntries.bind(this)
        this.getImage = this.getImage.bind(this);
        this.getContent = this.getContent.bind(this);
        // this.updateEntryClicked = this.updateEntryClicked.bind(this)
        // this.addEntryClicked = this.addEntryClicked.bind(this)
    }

    componentDidMount() {
        // console.log('did mount');
        this.refreshEntries();
        // this.getImage();
        // this.getContent();
    }

    viewDetailHandler= (i) => {
        console.log(i);

        // const entries = this.state.entries.slice();
        // entries.push(i, 0, <tr> details... </tr>);

        console.log('this.state.entries[i]');
        console.log(this.state.entries[i]);
        // console.log(this.state.entries[i].idString);
        return (
          <div>
          <table>
            <tr>
              <td><b>Id: </b></td>
              <td>{this.state.entries[i].idString}</td>
            </tr>

          </table>
        </div>
        );

        // this.setState({entries: entries});
    }

    refreshEntries() {
        EntryDataService.retrieveAllEntries(ORGANIZATION) // HARDCODED
            .then(
                response => {
                    console.log("response -----");
                    console.log(response);
                    this.setState({entries: response.data})
                    // console.log(this.state.entries[4].identity);
                }
            )
    }

    getImage() {
        EntryDataService.retrieveImage(this.state.imgpath) // HARDCODED
            .then(
                response => {
                    console.log("images -----");
                    // console.log(response);
                    this.setState({imgpath: response.data});
                    console.log('this.state.imgpath:');

                    console.log(this.state.imgpath);

                }
            )
    }

    getContent() {
        console.log("entered get content");
        console.log(EntryDataService.retrieveContent());
        EntryDataService.retrieveContent()
            .then(
                response => {
                    console.log("content -----");
                    console.log(response);
                    this.setState({imgpath: response});
                }
            )

    }

    render() {
        const style = {
            backgroundColor: 'grey',
            font: 'inherit',
            border: '1x solid lightblue',
            padding: 'pointer',
            hover: 'true'
        };
        const images = require.context('../logos', true);
        const {entries, viewDetail, searchText} = this.props;

        return (
            <div>
                <Jumbotron>
                <h1>ENTRY LOGS</h1>
                    <p>
                    View history of system entry. Click individual logs for entrant details.
                    <div>
                        <p> searchText value is: {this.props.searchText} </p>
                    </div>
                    </p>

                <div className="">
                <p>
                    <FilterToolbar />
                    <Table bordered hover>
                        <thead>
                            <tr className="Entry">
                                <th>#</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody className="collapse in" style={style}>
                        {
                            this.state.entries
                                .filter(entry => {
                                    return entry.identity.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
                                })
                                .map((entry, i) => {
                                    // console.log(entry.identity.indexOf(searchText) >= 0);

                                return <Entry entry={entry} details={entry.content} onClick={() => this.viewDetailHandler(i)} />
                        })}
                        </tbody>

                    </Table>
                    </p>
                    <Button variant="primary">Learn more</Button>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addEntryClicked}>Return to Dashboard</button>
                    </div>
                </div>
                </Jumbotron>

            </div>
        )
    }
}

export default ListEntriesComponent;