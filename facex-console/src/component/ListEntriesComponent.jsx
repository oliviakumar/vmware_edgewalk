import React, { Component } from 'react';
import EntryDataService from '../service/EntryDataService';
import Toggle from './Toggle';
import { Jumbotron, Button, Table } from 'react-bootstrap';
import FilterToolbar from '../FilterToolbar/FilterToolbar'
import Entry from '../Entry/Entry'

const ORGANIZATION = 'edgewalk';

class ListEntriesComponent extends Component {
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

    refreshEntries() {
        EntryDataService.retrieveAllEntries(ORGANIZATION) // HARDCODED
            .then(
                response => {
                    console.log("response -----");
                    console.log(response);
                    this.setState({entries: response.data})
                    console.log(this.state.entries[4].identity);
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
            backgroundColor: 'lightpink',
            font: 'inherit',
            border: '1x solid lightblue',
            padding: 'pointer'
        };
        const images = require.context('../logos', true);
        const {entries, viewDetail, searchText} = this.props;

        return (
            <div>
                <Jumbotron>
                <h1>Hello, world!</h1>
                <p>
                  This is a simple hero unit, a simple jumbotron-style component for calling
                  extra attention to featured content or information.
                </p>
                <FilterToolbar />
                <div className="">
                    <Table bordered hover>
                        <thead>
                            <table>
                                <th>Location</th>
                                <th>Identity</th>
                                <th>Entry Status</th>
                                <th>Time</th>
                            </table>
                        </thead>
                        <tbody>
                            <div>
                                <p> searchText value is: {this.props.searchText} </p>
                            </div>
                            {
                                this.state.entries
                                    .map(entry => {
                                    // return <Toggle entry={entry} details={entry.content} onClick={() => {this.props.viewDetail(entry.id)}} />
                                    // console.log(entry);
                                    return <Entry entry={entry} details={entry.content}/>
                            })}
                        </tbody>

                    </Table>
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