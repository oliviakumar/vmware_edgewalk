import React, { Component } from 'react';
import EntryDataService from '../service/EntryDataService';

const ORGANIZATION = 'edgewalk';

class ListEntriesComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entries: [],
            message: null,
        }
        this.refreshEntries = this.refreshEntries.bind(this)
        // this.updateEntryClicked = this.updateEntryClicked.bind(this)
        // this.addEntryClicked = this.addEntryClicked.bind(this)
    }

    componentDidMount() {
        this.refreshEntries();
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

    // updateEntryClicked(id) {
    //     console.log('update ' + id)
    //     this.props.history.push(`/entries/${id}`)
    // }

    // addEntryClicked() {
    //     this.props.history.push(`/entries/-1`)
    // }

    render() {
        return (
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Location</th>
                                <th>Identity</th>
                                <th>Entry Status</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> hello?? </td>
                            </tr>
                        </tbody>
                        <tbody>
                            {

                                this.state.entries.map(
                                    entry =>
                                    <tr key={Math.random()}>
                                        <td> {entry.location} </td>
                                        <td> {entry.identity} </td>
                                        <td> {entry.accepted ? "true" : "false"} </td>
                                        <td> {entry.attempted} </td>
                                    </tr>
                                )
                            }
                        </tbody>

                        {
                        //     <tbody>
                        // {
                        //     // this.state.entries.map(
                        //     //     entry =>
                        //     //         <tr key={entry.id}>
                        //     //             <td>{entry.id} hello?? {entry}</td>
                        //     //             <td><button className="btn btn-success" onClick={() => this.updateEntryClicked(entry.id)}>Update</button></td>
                        //     //             <td>{entry.description}</td>
                        //     //         </tr>
                        //     // )
                        // }
                        // {
                        //     this.state.contacts.map(
                        //         contact =>
                        //             <tr key={contact.id}>
                        //                 <td>{contact.id} hello?? </td>
                        //                 <td><button className="btn btn-success" onClick={() => this.updateEntryClicked(contact.id)}>Update</button></td>
                        //                 <td>{contact.name}</td>
                        //             </tr>
                        //     )
                        // }
                        // </tbody>
                        }
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addEntryClicked}>Add</button>
                    </div>
                </div>
        )
    }
}

export default ListEntriesComponent;