import React, { Component } from 'react'

class AddNewEntry extends Component {
    constructor() {
        super()
        this.state = {
            summary: "",
            acceptanceCriteria: "",
            status: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()
        const newEntry = {
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status
        }
        console.log(newEntry);
    }

    render() {
        return (
            <div>
            <div className="addNewEntry">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <a href="/" className="btn btn-light">
                                Back to Board
                            </a>
                            <h4 className="display-4 text-center">Add /Update Project Task</h4>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    name="summary"
                                    value={this.state.summary}
                                    placeholder="Project Task summary"
                                    onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                    className="form-control form-control-lg"
                                    placeholder="Acceptance Criteria"
                                    name="acceptanceCriteria"></textarea>
                                    value={this.state.acceptanceCriteria}
                                </div>
                                <div className="form-group">
                                    <select className="form-control form-control-lg"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>
                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default AddNewEntry;