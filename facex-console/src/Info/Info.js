import React from 'react';
// import './App.css';
// import noauth from '../unauth.png';
import noauth from "../unauthId.png";

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

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      response: [],
    };
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

  render() {
      // console.log(`this.state.error: `, this.state.error)
      // console.log(`this.state.isLoaded: `, this.state.isLoaded)
      console.log(`infojs this.state.response: `, this.state.response)
          return (
              <div>
                {renderImage('http://localhost:8080/files/', this.props.idStr)}
              </div>
          );
      }
  }


export default Info;

/*
    <img src={noauth}/>
*/
