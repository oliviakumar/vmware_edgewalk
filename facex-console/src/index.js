import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppTwo from './AppTwo';
import Test from './Test';

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

// function showDiv() {
//    document.getElementById('welcomeDiv').style.display = "block";
// }

ReactDOM.render(<App />, document.getElementById('container'));
// ReactDOM.render(<App />, document.getElementById('root'));

// axios({
//     method: 'get',
//     url: `${ORG_API_URL}/files/liv-get-photo`
//   })
//     .then(function(response) {
//     console.log('liv-get-photo: ');
//     console.log(response);
//   });
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
