import React, { Component } from 'react';
import EntryDataService from '../service/EntryDataService';

const ORGANIZATION = 'edgewalk';

class ListEntriesComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entries: [],
            message: null
        }
        this.refreshEntries = this.refreshEntries.bind(this)
        this.updateEntryClicked = this.updateEntryClicked.bind(this)
        this.addEntryClicked = this.addEntryClicked.bind(this)
    }

    componentDidMount() {
        this.refreshEntries();
    }

    refreshEntries() {
        EntryDataService.retrieveAllEntries(ORGANIZATION) // HARDCODED
            .then(
                response => {
                    console.log(response);
                    this.setState({entries: response.data})
                }
            )
    }

    updateEntryClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/entries/${id}`)
    }

    addEntryClicked() {
        this.props.history.push(`/entries/-1`)
    }

    render() {
        return (
            <div className="container">
                <h3>All Entries</h3>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.entries.map(
                                entry =>
                                    <tr key={entry.id}>
                                        <td>{entry.id}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateEntryClicked(entry.id)}>Update</button></td>
                                        <td>{entry.description}</td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addEntryClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListEntriesComponent;