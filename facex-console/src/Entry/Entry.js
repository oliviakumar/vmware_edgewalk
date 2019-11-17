import React, {useState} from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import './Entry.css';

const Entry = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    // const statusColor = () => setStatusColor(!isApproved)
    const style = 'red'


      return <tr className="Entry" onClick={toggle} >
            <td> {Math.random()} </td>
            <td> {props.entry.identity} </td>
            <td> {props.entry.location} </td>
            <td> {props.entry.attempted} </td>
            <td style={{ hover: 'true', backgroundColor: props.entry.accepted === "true" ?  'green' : 'red' }}> {props.entry.accepted === "true" ? "yes" : "no"} </td>

          </tr>
}

export default Entry;

/* 

return <tr onClick={props.click} style={{ marginBottom: '1rem', width: '100%'}}>

*/
