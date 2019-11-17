import React, {useState} from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import './Entry.css';

const Entry = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);


      return <tr className="Entry" onClick={toggle}>
            <td> {props.entry.identity} </td>
            <td> {props.entry.location} </td>
            <td> {props.entry.attempted} </td>
            <td> {props.entry.accepted} </td>

          </tr>
}

export default Entry;

/* 

return <tr onClick={props.click} style={{ marginBottom: '1rem', width: '100%'}}>

*/
