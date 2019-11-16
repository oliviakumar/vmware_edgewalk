import React, {useState} from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

const Entry = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);


      return <tr onClick={toggle} style={{ marginBottom: '1rem', width: '100%'}}>
            <td> {props.id} </td>
            <td> {props.identity} </td>
            <td> {props.location} </td>
            <td> {props.attempted} </td>
            <td> {props.accepted} </td>


      <Collapse isOpen={isOpen}>
      <Card>
          <CardBody>
          {props.attempted}
          </CardBody>
      </Card>
      </Collapse>

          </tr>
}

export default Entry;