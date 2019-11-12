import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import EntryDataService from '../service/EntryDataService';

const ORGANIZATION = 'edgewalk';

class EntryComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            description: ''
        }
    }

    componentDidMount() {
        console.log(this.state.id)

        // eslint-disable-next-line
        if (this.state.id == -1) {
            return;
        }

        EntryDataService.retrieveEntry(ORGANIZATION, this.state.id)
            .then(response => this.setState({
                description: response.data.description
            }))
    }

    render() {
        let { description, id } = this.state

        return (
            <div>
              <h3>Entry</h3>
              <div>{id}</div>
              <div>{description}</div>
            </div>
        );
    }
}

export default EntryComponent;