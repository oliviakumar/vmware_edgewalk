import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { Jumbotron, Table, Panel, OverlayTrigger, Popover } from 'react-bootstrap';
import ViewEntry from '../SidePanel/ViewEntry';
import Info from '../Info/Info';
import noauth from "../unauthId.png";

import './Entry.css';

const Entry = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    // state = {
    //     posts: []
    // }

    const milli = props.entry.attempted;
    const time = {
        dt: new Date(+milli)
    };
    console.log(`time:`, time.dt);

    const successStyle = {
      backgroundColor: 'chartreuse',
    }

    const failStyle = {
      backgroundColor: 'red',
    }

    useEffect(() => {
        // const fetchPosts = async
    });

    function renderColor(accepted) {
      if (accepted === true) {
        return <td style={successStyle}></td>
      } else {
        return <td style={failStyle}></td>
      }
    }

    function renderTime(attempted) {
      console.log(`time-:`, new Date(attempted));
    }

  return <tr href="#" className="Entry" onClick={props.onClick}>

        {
        // <td> {Math.random()} </td>
        }

        {

        }

        <td> {renderColor(props.entry.accepted)} {props.entry.identity} </td>
        <td> <td style={{border: 'transparent'}}></td> {props.entry.location} </td>
        <td> <td style={{border: 'transparent'}}></td> {props.entry.attempted} </td>

        <td style={{justifyContent: 'center'}}><Info idStr={props.idStr} /> </td>
        {
        // <ViewEntry idStr={props.entry.idString}/>
        }

      </tr>
// return ret + ' entry detail view '
}

export default Entry;

/*
<td> {props.entry.accepted.toString() === "true" ? "approved" : "denied"} </td>
return <tr onClick={props.click} style={{ marginBottom: '1rem', width: '100%'}}>
console.log(props.entry.idString)
*/
