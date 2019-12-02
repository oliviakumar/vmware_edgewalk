import React, { Component } from 'react';

class StatusPopup extends Component {

    constructor() {
        super();
        this.state = {
            openModal: false
        }
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

    render() {
        return (
            <div>
                {
                // {document.getElementById('button-enter').addEventListener('click', () => {
                //     this.handleOpenModel();
                // })}
                }
                <button id="myBtn" onClick={this.handleOpenModel}>Open Modal</button>

                <div
                    id="myModal"
                    className="modal"
                    style={{ display: this.state.openModal ? 'block' : 'none' }}>
                    <div className="modal-content">
                        <span className="close" onClick={this.handlModelClose}>&times;</span>
                        <p>Some text in the Modal...</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default StatusPopup;
