import React from 'react';
// import './App.css';

const successStyle = {
  backgroundColor: 'chartreuse',
}

const failStyle = {
  backgroundColor: 'red',
}

function renderImage(host, id) {
  const c = host + id
  return (
      <img src={c} />
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
      // console.log(this.props);

      // console.log('info cdm');
      // if (this.props.toggleOpen == true) {
          // this.getInfo(this.state.response.idString);
      // }
  }

  getInfo() {
      // console.log(`getInfo id:`, id);
      /*
      backend.js:6 Uncaught RangeError: Maximum call stack size exceeded
          at Set.has (<anonymous>)
      */
    const fetchUrl = "http://localhost:8080/5ddc6a0ae695521851756eb2";
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
      return (
        <div>
            <p> {this.props.idStr} </p>
            {this.getInfo()}
            {renderImage('http://localhost:8080/files/', this.props.idString)}

        </div>
    );
  }
  // render() {
  //   const { error, isLoaded, response } = this.state;
  //   // console.log(response);
  //
  //   if (error) {
  //     return <div>Error: {error.message}</div>;
  //   } else if (!isLoaded) {
  //     return <div>Loading.....</div>;
  //   } else {
  //     return (
  //       <div>
  //       <table>
  //         <tr>
  //           <td><b>Id: </b></td>
  //           <td>{response.idString}</td>
  //         </tr>
  //         <tr>
  //           <td><b>EdgeX Id: </b></td>
  //           <td>{response.edgexId}</td>
  //         </tr>
  //         <tr>
  //           <td><b>Identity: </b></td>
  //           <td>{response.identityCapital}</td>
  //         </tr>
  //         <tr>
  //           <td><b>Location: </b></td>
  //           <td>{response.locationCapital}</td>
  //         </tr>
  //         <tr>
  //           <td><b>Device: </b></td>
  //           <td>{response.device}</td>
  //         </tr>
  //         <tr>
  //           <td><b>Type: </b></td>
  //           {renderType(response.typeCapital)}
  //         </tr>
  //         <tr>
  //           <td><b>Time: </b></td>
  //           <td>{response.attempted}</td>
  //         </tr>
  //         <tr>
  //           <td><b>Accepted: </b></td>
  //           {renderColor(response.accepted)}
  //         </tr>
  //       </table>
  //       {renderImage('http://localhost:8080/files/', response.idString)}
  //     </div>
  //     );
  //   }
  // }
}

// function Info() {
//   return (
//     <div className="Info">
//       <header className="Info-header">
//         <MyComponent />
//       </header>
//     </div>
//   );
// }

export default Info;
