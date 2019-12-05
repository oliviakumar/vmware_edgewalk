import React, {Component, Input} from 'react';
import { Row } from 'reactstrap';
import { FormControl} from 'react-bootstrap';
import './Search.css';

class Search extends Component {
    filterUpdate() {
        const val = this.myValue.value;
        console.log(val);
        this.props.searchUpdate(val);
    }

    render() {
        return (
                <form class="round">
                    <svg width="20px" height="22px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 18" aria-hidden="true"><g id="Page-1" stroke="none" fill="none" ><g id="Artboard-1" stroke="#777777" ><g id="Group"><path d="M13.4044,7.0274 C13.4044,10.5494 10.5494,13.4044 7.0274,13.4044 C3.5054,13.4044 0.6504,10.5494 0.6504,7.0274 C0.6504,3.5054 3.5054,0.6504 7.0274,0.6504 C10.5494,0.6504 13.4044,3.5054 13.4044,7.0274 Z" id="Stroke-3"></path><path d="M11.4913,11.4913 L17.8683,17.8683" id="Stroke-7"></path></g></g></g></svg>

                    <input
                        padding="5px"
                        className="rounded p-2 search"
                        size="30"
                        line-height="28px"
                        type="text"
                        ref={ (value) => {this.myValue = value} }
                        placeholder="Search By Entrant"
                        onChange={this.filterUpdate.bind(this)}/>
                </form>
        )
    }
}
export default Search;

                        // style={{background: 'transparent', border: 'hidden', selection: }}
