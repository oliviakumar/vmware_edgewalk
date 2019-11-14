import axios from 'axios'

const ORGANIZATION = 'edgewalk'
const ORG_API_URL = 'http://localhost:8080'
const ORGANIZATION_API_URL = `${ORG_API_URL}/approved/${ORGANIZATION}`

class EntryDataService {

    retrieveAllEntries(name) {
        // console.log(axios.get(`${ORG_API_URL}/edgewalk/liv-entries`));
        // return axios.get(`${ORG_API_URL}/edgewalk/liv-entries`);
        console.log(axios.get(`${ORG_API_URL}/all`));
        return axios.get(`${ORG_API_URL}/all`);
        // http://localhost:3000/all
        // return axios.get(`${ORG_API_URL}/all`);
    }

    retrieveImage() {
        // console.log(axios.get(`@{ORG_API_URL}/vmware_edgewalk/model-goface/images/Olivia/olivia3.jpg`));
        // return axios.get(`@{ORG_API_URL}/vmware_edgewalk/model-goface/images/Olivia/olivia3.jpg`);
        console.log('test');
        var response = '';
        // console.log(axios.get(`${ORG_API_URL}/files/liv-get-photo`));
        axios({
            method: 'get',
            url: `${ORG_API_URL}/files/liv-get-photo`
          })
            .then(function(response) {
            console.log(response);
          });
        return response;
    }

    retrieveContent() {
        // console.log("inside retrieve content");
        // console.log(axios.get(`@{ORG_API_URL}/contentResponse`));
        // return axios.get(`@{ORG_API_URL}/contentResponse`);
        
        console.log("inside retrieve content");
        // console.log(axios.get(`${ORG_API_URL}/default-filtered`));
        // return axios.get(`${ORG_API_URL}/default-filtered`);

        // console.log(axios.get(`${ORG_API_URL}/edgewalk/Doug/entries/`));
        // return axios.get(`${ORG_API_URL}/edgewalk/Doug/entries/`);
        // console.log(axios.get(`${ORG_API_URL}/contentResponse`));
        // return axios.get(`${ORG_API_URL}/contentResponse`);

        // console.log("inside retrieve content");
        console.log(axios.get(`@{ORG_API_URL}/contentResponse`));
        return axios.get(`@{ORG_API_URL}/contentResponse`);
    }
    // retrieveEntry(name, id) {
    //     return axios.get(`${ORG_API_URL}/entries/${id}`);
    // }
}

export default new EntryDataService();