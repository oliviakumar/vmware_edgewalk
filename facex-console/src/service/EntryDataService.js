import axios from 'axios'

const ORGANIZATION = 'edgewalk'
const ORG_API_URL = 'http://localhost:8080'
const ORGANIZATION_API_URL = `${ORG_API_URL}/approved/${ORGANIZATION}`

class EntryDataService {

    retrieveAllEntries(name) {
        return axios.get(`${ORG_API_URL}/entries`);
    }

    retrieveEntry(name, id) {
        return axios.get(`${ORG_API_URL}/entries/${id}`);
    }
}

export default new EntryDataService();