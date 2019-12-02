import React, { Component, Link, FilterOptions, Input } from 'react';
import {Route, IndexRoute} from 'react-router';
import { Row, Col } from 'reactstrap'
import EntryDataService from '../service/EntryDataService';
import Toggle from './Toggle';
import ViewDetail from './ViewDetail';
import { Jumbotron, Button, Table } from 'react-bootstrap';
import FilterToolbar from '../FilterToolbar/FilterToolbar'
import Entry from '../Entry/Entry'
import '../Entry/Entry.css';
import '../App.css';
import Filter from '../Filter/Filter';
import './ListEntriesComponent.css';
import Search from './Search';

const ORGANIZATION = 'edgewalk';

class ListEntriesComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entries: [
                { id: '0', identity: 'Olivia', attempted: '3:45', location: 'front door', accepted: true },
                { id: '1', identity: 'Doug', attempted: '4:20', location: 'back door', accepted: true },
                { id: '2', identity: 'Kevin', attempted: '9:00', location: 'front door', accepted: false }
            ],
            message: null,
            imgpath: '',
            isFiltering: false,
            searchText: '',
            openModal: false
        }
        this.refreshEntries = this.refreshEntries.bind(this)
        this.getImage = this.getImage.bind(this);
        this.getContent = this.getContent.bind(this);
        this.filterHandler = this.filterHandler.bind(this);
        this.onClick = this.onClick.bind(this);
        // this.updateEntryClicked = this.updateEntryClicked.bind(this)
        // this.addEntryClicked = this.addEntryClicked.bind(this)

        this.handleOpenModel = this.handleOpenModel.bind(this);
        this.handlModelClose = this.handlModelClose.bind(this);
    }


    handleOpenModel() {
        this.setState({
            openModal: true,
        })
    }

    handlModelClose() {
        this.setState({
            openModal: false,
        })
    }

    componentDidMount() {
        // console.log('did mount');
        this.refreshEntries();
        // this.getImage();
        this.getContent();
        console.log(`parent state!`);
        console.log(`parent state:`, this.props.recent);
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

    searchUpdate(value) {
      this.setState({searchText: value});
    }

    callbackFn = (childData) => {
        console.log('cbf reached');
        this.setState({isFiltering: true});
    }

    viewDetailHandler = (i) => {
        console.log(`i:`, i);

        // const entries = this.state.entries.slice();
        // entries.push(i, 0, <tr> details... </tr>);

        console.log('this.state.entries[i]');
        console.log(this.state.entries[i].idString);

        // const c = host + id
        // return (
        //     <img src={c} />
        //   );
        /*
        // console.log(this.state.entries[i].idString);
        // return (
        //   <div>
        //   <table>
        //     <tr>
        //       <td><b>Id: </b></td>
        //       <td>{this.state.entries[i].idString}</td>
        //     </tr>
        //
        //   </table>
        // </div>
        // );

        // this.setState({entries: entries});
        */
    }

    onClickHandler() {
        // console.log('look we made it');
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
                    // console.log("");
                    console.log(`content -----:`, response);
                    this.setState({imgpath: response});
                    return <div> response </div>;
                }
            )

    }

    render() {
        const style = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1x solid lightblue',
            padding: 'pointer',
            hover: 'true',
            opacity: '.9'
        };
        const images = require.context('../logos', true);
        const {entries, viewDetail, searchText, filterText, recent} = this.props;

        console.log(`outcome:-`, this.props.recent);
        const retVal = this.props.recent;

        return (
            <div>
            <Jumbotron style={{backgroundColor: '#cfcfdf', color: '#d1a7c8'}}>
            <div style={{textAlign: 'center'}}>
                    <h1 style={{textAlign: 'center'}}>ENTRY LOGS</h1>
                    <p style={{textAlign: 'center'}}></p>

                    View history of system entry. Click individual logs for entrant details.

                    { (this.props.recent == undefined ? <p> Loading... </p> : <p> {retVal} </p>)}
                    Hello?


            </div>
            <br/>
            <div style={{align: 'right', padding: '10'}} >
                <FilterToolbar
                    searchText={this.state.searchText} searchUpdate={this.props.searchUpdate.bind(this)}
                    options={this.state.entries} filterUpdate={this.props.filterUpdate.bind(this)}>
                </FilterToolbar>
            </div>


                    {
                        // <div>
                        // <p> searchText value is: {this.props.searchText} </p>
                        // <p> filterText value is: {this.props.filterText} </p>
                    // </div>
                    }
                <div>
                <p>
                    <Table bordered hover >
{
                        <thead style={{backgroundColor: 'lavender', border: 'none', font: 'inherit'}}>
                            <tr className="ListEntryHead" onClick={this.onClickHandler()}>
                                <th>NAME</th>
                                <th>LOCATION</th>
                                <th>TIME</th>
                                {
                                    // <th>STATUS</th>
                                }
                                <th>DETAILS</th>
                            </tr>
                        </thead>
}
                        <tbody className="collapse in shadow ListEntryBod" style={{backgroundColor: 'white', boxShadow: '2px 0 grey, inset 2px 0 grey'}}>
                        {
                            this.state.entries
                                .filter(entry => {
                                    return entry.identity.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
                                })
                                .filter(entry => {
                                    // console.log(`entry:`, entry);
                                    // console.log(`filterText:`, filterText);
                                    return entry.location.toLowerCase().indexOf(filterText.toLowerCase()) >= 0;
                                })
                                .map((entry, i) => {
                                    // console.log(`entry.idString:`, entry.idString);
                                    return <Entry entry={entry} idStr={entry.idString} onClick={() => this.viewDetailHandler(i)} />
                            })
                        }
                        </tbody>

                    </Table>
                </p>
                <Row>
                    <Button variant="primary">Learn more</Button>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addEntryClicked}>Return to Dashboard</button>
                    </div>
                </Row>
                </div>
                </Jumbotron>

            </div>
        )
    }
}

export default ListEntriesComponent;
