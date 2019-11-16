import React, { Component } from 'react';
import EntryDataService from '../service/EntryDataService';
import Toggle from './Toggle';

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
        this.refreshEntries();
        this.getImage();
        this.getContent();
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



    // updateEntryClicked(id) {
    //     console.log('update ' + id)
    //     this.props.history.push(`/entries/${id}`)
    // }

    // addEntryClicked() {
    //     this.props.history.push(`/entries/-1`)
    // }

    onFileChange = (event) => {
        this.setState({
          file: event.target.files[0]
        });
      }

    render() {
        const images = require.context('../logos', true);
        const {entries, viewDetail, searchText} = this.props;
        {
            // const entriesList = this.state.entries
            
            // .filter(entry => {
            //     // remove entries that don't match curr filter text
            //     console.log(entry);
            //     // return entry.indexOf(searchText) > -1
            // })
            // .map(entry => {
            //     return (
            //         <Toggle entry={entry} details={entry.content} onClick={() => {this.props.viewDetail(entry.id)}} />
            //     )
            // })
{
    // <tr key={Math.random()}>

                    // <td> {entry.location} </td>
                    // <td> {entry.identity} </td>
                    // <td> {entry.accepted ? "true" : "false"} </td>
                    // <td> {entry.attempted} </td>
}
                    {
                        // <Toggle entry={entry} details={entry.name}/>
                    // <img src={require('/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/model-goface/images/Olivia/olivia3.jpg')}> </img>
                    }


        return (
            <div>
                <div className="container">
                    <table className="table">
                        <thead>
                            <table>
                                <th>Location</th>
                                <th>Identity</th>
                                <th>Entry Status</th>
                                <th>Time</th>
                            </table>
                        </thead>
                        <tbody>
                            <tr>
                                <td> hello?? </td>
                                <td> are you there? </td>
                                <td> bye THERE </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <div>
                                <p> searchText value is: {this.props.searchText} </p>
                            </div>
                                
                            {//entriesList
                            }
                            {this.state.entries
                            //     .filter(entry => {
                            //     // remove entries that don't match curr filter text
                            //     return entry.indexOf(searchText) > -1 ? (entry.indexOf(searchText)) : null;
                            // })
                            .map(entry => {
                                return <Toggle entry={entry} details={entry.content} onClick={() => {this.props.viewDetail(entry.id)}} />
                            })}
                        </tbody>

                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addEntryClicked}>Return to Dashboard</button>
                    </div>
                </div>
            </div>
        )
    }
    }
}

export default ListEntriesComponent;