import React, { Component, Link, FilterOptions, Input } from 'react';
import {Route, IndexRoute} from 'react-router';
import { Row } from 'reactstrap'


import EntryDataService from '../service/EntryDataService';
import Toggle from './Toggle';
import ViewDetail from './ViewDetail';
import { Jumbotron, Button, Table } from 'react-bootstrap';
import FilterToolbar from '../FilterToolbar/FilterToolbar'
import Entry from '../Entry/Entry'
import '../Entry/Entry.css';
import '../App.css';
import Filter from '../Filter/Filter';


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
            isFiltering: false,
        }
        this.refreshEntries = this.refreshEntries.bind(this)
        this.getImage = this.getImage.bind(this);
        this.getContent = this.getContent.bind(this);
        this.filterHandler = this.filterHandler.bind(this);
        this.onClick = this.onClick.bind(this);
        // this.updateEntryClicked = this.updateEntryClicked.bind(this)
        // this.addEntryClicked = this.addEntryClicked.bind(this)
    }

    componentDidMount() {
        // console.log('did mount');
        this.refreshEntries();
        // this.getImage();
        // this.getContent();
    }

    onClick(e) {
        console.log('onClick reached');

    }

    filterHandler = () => {
        // this.setState({isFiltering: true});
        console.log('filter handler reached');
    }

    basicFilterUpdate() {
        const val = this.myValue.value;
        console.log(val);
        this.props.filterUpdate(val);
    }

    filterUpdate() {
        const val = this.myValue.value;
        console.log('val');
        console.log(val);
        this.props.filterUpdate(val);
    }

    callbackFn = (childData) => {
        console.log('cbf reached');
        this.setState({isFiltering: true});
    }

    viewDetailHandler = (i) => {
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
        const {entries, viewDetail, searchText, filterText} = this.props;

        return (
            <div>
                <Jumbotron>
                <h1>ENTRY LOGS</h1>
                    <p>
                    View history of system entry. Click individual logs for entrant details.
                    <div>
                        <p> searchText value is: {this.props.searchText} </p>
                        <p> filterText value is: {this.props.filterText} </p>
                    </div>
                    </p>

                <div className="">
                <p>

                <FilterToolbar options={this.state.entries} basicFilterUpdate={this.props.basicFilterUpdate.bind(this)} filterUpdate={this.props.filterUpdate.bind(this)}>
                </FilterToolbar>

                    {
                        // {this.state.isFiltering === 'true' ? 'worked!' : 'did not work!'} </p>
                        //
                        //

                        // <Navbar variant="light" bg="light">
                        //     <Filter options={this.state.entries}/>
                        // </Navbar>

                        // <Filter options={this.state.entries} onClick={() => this.filterHandler()}/>
                    }
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
                                // .filter(entry => {
                                //     return entry.location.toLowerCase().indexOf(filterText.toLowerCase()) >= 0;
                                // })
                                .map((entry, i) => {
                                    return <Entry entry={entry} details={entry.content} onClick={() => this.viewDetailHandler(i)} />
                            })
                        }
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
