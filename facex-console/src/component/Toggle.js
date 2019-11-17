import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';


const Toggle = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button onClick={toggle} style={{ marginBottom: '1rem', width: '100%'}}>
      <td>{props.entry.identity}</td>
      <td>{props.entry.location}</td>
      <td>{props.entry.status}</td>
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            {props.entry.attempted}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

export default Toggle;