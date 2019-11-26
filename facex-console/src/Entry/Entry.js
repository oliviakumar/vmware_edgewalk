import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { Jumbotron, Table, Panel, OverlayTrigger, Popover } from 'react-bootstrap';
import ViewEntry from '../SidePanel/ViewEntry';

import './Entry.css';

const Entry = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const successStyle = {
      backgroundColor: 'chartreuse',
    }

    const failStyle = {
      backgroundColor: 'red',
    }

    function renderColor(accepted) {
      if (accepted) {
        return <td style={successStyle}></td>
      } else {
        return <td style={failStyle}></td>
      }
    }

    // viewDetailHandler = (i) => {
      // console.log('from entry: ' + i);
      // const entries = this.state.entries;
      // entries.push(i, 0, <tr> details... </tr>);
      // this.setState({entries: entries});
    // }
    // const popover = (
    //   <Popover id="popover-basic">
    //     <Popover.Title as="h3">Popover right</Popover.Title>
    //     <Popover.Content>
    //       And here's some <strong>amazing</strong> content. It's very engaging.
    //       right?
    //     </Popover.Content>
    //   </Popover>
    // );
    //
    // const Example = () => (
    //   <OverlayTrigger trigger="click" placement="right" overlay={popover}>
    //     <Button variant="success">Click me to see</Button>
    //   </OverlayTrigger>
    // );
    //
    // ReactDOM.render(<Example />);
    // console.log(`props.details:`, props.index);
    // console.log(`state from LEC:`, props.state.entries);
        // const ret =
      return <tr href="#" className="Entry" onClick={props.onClick}>
            <td> {Math.random()} </td>
            <td> {props.entry.identity} </td>
            <td> {props.entry.location} </td>
            <td> {props.entry.attempted} </td>
            <td> {renderColor(!props.entry.accepted)} </td>

            <ViewEntry idStr={props.entry.idString}/>
          </tr>
// return ret + ' entry detail view '
}

export default Entry;

/*
<td> {props.entry.accepted.toString() === "true" ? "approved" : "denied"} </td>
return <tr onClick={props.click} style={{ marginBottom: '1rem', width: '100%'}}>
console.log(props.entry.idString)
*/
