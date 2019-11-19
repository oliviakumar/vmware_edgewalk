import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from "react-router-dom";
import axios from 'axios'
// import '../public/*'
// import htmlContent from '/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/service/src/main/resources/templates/main.html';

const ORGANIZATION = 'edgewalk'
const ORG_API_URL = 'http://localhost:8080'
const ORGANIZATION_API_URL = `${ORG_API_URL}/approved/${ORGANIZATION}`

class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
        this.refreshEntries = this.refreshEntries.bind(this)
    }

    componentDidMount() {
        console.log('did mount');
        this.refreshEntries();
    }

    refreshEntries() {
        axios
        .get("http://localhost:8080/all")
        .then(data => {
            // console.log(data.data[0].identity);
            this.setState({data: data.data});
        })
        .catch(err => alert(err));

        axios
        .get("http://localhost:8080/content")
        .then(data => {
            // console.log(data);
            // this.setState({data: data});
        })
        .catch(err => alert(err));

        // function call() {
        // 	$.ajax({
        // 		url : '/all',
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
    }

  render() {
    return (
      <Router>
        <div className="test">
          <h1 className="alert alert-warning"> FACEX </h1>
            <h1>testing...</h1>

            <p> hi </p>
            {
                this.state.data
                    .map((entry) => {

                        console.log(entry);

                })

            }
            // <img src="../public/logo192.png"> img </img>

        </div>
      </Router>
    );
  }
}

export default Test;



// facex-console/src/facex.png
//
// <img src="`../../service/${data.code}.jpg`"> img </img>
//
            // {console.log('reached2');}
            // <img src={`../files/${data.code}.jpg`}
            // <div dangerouslySetInnerHTML={ {__html: this.state.data} } />

            // <img src="`../files/${data.code}.jpg`"> img </img>

// class EntryDataService {
//
//     retrieveAllEntries(name) {
//         // console.log(axios.get(`${ORG_API_URL}/edgewalk/liv-entries`));
//         // return axios.get(`${ORG_API_URL}/edgewalk/liv-entries`);
//         // console.log(axios.get(`${ORG_API_URL}/all`));
//         // axios.get(`${ORG_API_URL}/edge/clear`);
//         return axios.get(`${ORG_API_URL}/all`);
//         // http://localhost:3000/all
//         // return axios.get(`${ORG_API_URL}/all`);
//     }
//
//     retrieveImage(imgpath) {
//         // console.log(axios.get(`@{ORG_API_URL}/vmware_edgewalk/model-goface/images/Olivia/olivia3.jpg`));
//         // return axios.get(`@{ORG_API_URL}/vmware_edgewalk/model-goface/images/Olivia/olivia3.jpg`);
//         console.log('test' + imgpath);
//         var response = '';
//         // console.log(axios.get(`${ORG_API_URL}/files/liv-get-photo`));
//         // axios({
//         //     method: 'get',
//         //     url: `${ORG_API_URL}/files/liv-get-photo`
//         //   })
//         //     .then(function(response) {
//         //     console.log('liv-get-photo: ');
//         //     console.log(response);
//         //   });
//         return axios({
//             method: 'get',
//             url: `${ORG_API_URL}/files/liv-get-photo`
//           });
//             // .then(function(response) {
//             //     const path = response.data;
//             //     console.log(path);
//
//             //     this.setState({imgpath: path});
//         //   });;
//
//     }
//
//     retrieveContent() {
//         // console.log("inside retrieve content");
//         // console.log(axios.get(`@{ORG_API_URL}/contentResponse`));
//         // return axios.get(`@{ORG_API_URL}/contentResponse`);
//
//         console.log("inside retrieve content");
//         // console.log(axios.get(`${ORG_API_URL}/default-filtered`));
//         // return axios.get(`${ORG_API_URL}/default-filtered`);
//
//         // console.log(axios.get(`${ORG_API_URL}/edgewalk/Doug/entries/`));
//         // return axios.get(`${ORG_API_URL}/edgewalk/Doug/entries/`);
//         // console.log(axios.get(`${ORG_API_URL}/contentResponse`));
//         // return axios.get(`${ORG_API_URL}/contentResponse`);
//
//         // console.log("inside retrieve content");
//         // console.log(axios.get(`@{ORG_API_URL}/contentResponse`));
//         // return axios.get(`@{ORG_API_URL}/contentResponse`);
//         /* LOADS AN IMAGE BUT NOT THE CORRECT ONE
//             console.log(axios.get(`@{ORG_API_URL}/files/liv-get-photo2`));
//             return axios.get(`@{ORG_API_URL}/files/photo1`);
//         */
//         // console.log(axios.get(`@{ORG_API_URL}/files/liv-entries`));
//         // return axios.get(`@{ORG_API_URL}/files/liv-entries`);
//
//         return axios.get(`${ORG_API_URL}/files/{filename}`);
//
//     }
//     // retrieveEntry(name, id) {
//     //     return axios.get(`${ORG_API_URL}/entries/${id}`);
//     // }
// }
//
// export default new EntryDataService();
