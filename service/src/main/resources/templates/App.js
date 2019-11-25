import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1 className="alert alert-warning"> FACEX </h1>
            <h1>testing...</h1>
            // function call() {
    		// 	$.ajax({
    		// 		url : '/content',
    		// 		type : 'GET',
    		// 		success : function (data) {
    		// 			$('#container').html(data);
    		// 		},
    		// 		error : function (error) {
    		// 			alert(error);
    		// 		}
    		// 	});
    		// }
            //
    		// setInterval(function() {
    		// 	call();
    		// }, 1000)
        </div>
      </Router>
    );
  }
}

export default App;
