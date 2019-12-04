import React from 'react';
// import './App.css';
// import noauth from '../unauth.png';
import noauth from "../unauthId.png";
import Zoom from "./Zoom/Zoom";
import ImageModal from "./ImageModal/ImageModal";
import StatusPopup from "../StatusPopup/StatusPopup";

const successStyle = {
  backgroundColor: 'chartreuse',
}

const failStyle = {
  backgroundColor: 'red',
}

function renderImage(host, id) {
  console.log(`renderImage id:`, id);
  const c = host + id
  return (
      <img src={c} onerror="this.src={noauth}" height="50" width="50"/>
    );
}

function renderImageZoom(host, id) {
  console.log(`renderImage id:`, id);
  const c = host + id
  return (
      c
    );
}

function renderType(type) {
  if (type == 'O') {
    return (<td>Outgoing</td>);
  } else {
    return (<td>Incoming</td>);
  }
}

function renderColor(accepted) {
  if (accepted) {
    return <td style={successStyle}></td>
  } else {
    return <td style={failStyle}></td>
  }
}

const temp = 'http://localhost:8080/files/';
const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <button
          onClick={handleClose}
        >
          Close
        </button>
      </section>
    </div>
  );
};

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      response: [],
      show: false,
      isOpen: false
    };
  }

  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
    console.log("clicked");
  };


  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  componentDidMount() {
{
      // console.log(`'info cdm'`, this.props.idStr);
}
      let url = 'http://localhost:8080/' + this.props.idStr;
      fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
              // console.log('content call');
              console.log(`result:`, result);
            //   this.setState({
            //       isLoaded: true,
            //       response: result,
            // });
          },
          (error) => {
            // this.setState({
            //   isLoaded: true,
            //   error
            // });
            // console.log('error');
          }
        )
  }

  getInfo() {
      // console.log(`getInfo id:`, id);
      /*
      backend.js:6 Uncaught RangeError: Maximum call stack size exceeded
          at Set.has (<anonymous>)
      */
    let suffix = this.props.idStr; /*"5ddc6a0ae695521851756eb2"; */
    // console.log(`suffix:`,suffix);
    let fetchUrl = "http://localhost:8080/all";
        fetch(fetchUrl)
          .then(res => res.json())
          .then(
            (result) => {
                console.log(`result:`, result);
                this.setState({
                    isLoaded: true,
                    response: result,
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
              // console.log('error');
            }
          )
  }
  // const c = 'http://localhost:8080/files/' + {this.props.idStr}

  render() {
          return (
              <div>
              {
                // {renderImage('http://localhost:8080/files/', this.props.idStr)}
            }
                {
                    // <ImageModal />
                // <Zoom buttonLabel="test"/>
                }
                <div>
                  <img
                    className="small"
                    src={'http://localhost:8080/files/' + `${this.props.idStr}`}
                    width="50"
                    onClick={this.handleShowDialog}
                    alt="no image"
                  />
                  {this.state.isOpen && (
                    <dialog
                      className="dialog"
                      style={{ position: "absolute" }}
                      open
                      onClick={this.handleShowDialog}
                    >
                      <img
                        className="image"
                        src={'http://localhost:8080/files/' + `${this.props.idStr}`}
                        onClick={this.handleShowDialog}
                        alt="no image"
                      />
                    </dialog>
                  )}
                </div>
              </div>
          );
      }

  }


export default Info;

/*
    <img src={noauth}/>
*/

/*

    state = { show: false }

    showModal = () => {
      this.setState({ show: true });
    }

    hideModal = () => {
      this.setState({ show: false });
    }

    render() {
      return (
        <main>
          <h1>React Modal</h1>
          <Modal show={this.state.show} handleClose={this.hideModal} >
            <p>Modal</p>
            <p>Data</p>
          </Modal>
          <button type='button' onClick={this.showModal}>Open</button>
        </main>
      )
    }
  }

  const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    return (
      <div className={showHideClassName}>
        <section className='modal-main'>
          {children}
          <button
            onClick={handleClose}
          >
            Close
          </button>
        </section>
      </div>
    );
  };

  */
