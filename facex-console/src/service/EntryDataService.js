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

    // retrieveEntry(name, id) {
    //     return axios.get(`${ORG_API_URL}/entries/${id}`);
    // }
}

export default new EntryDataService();