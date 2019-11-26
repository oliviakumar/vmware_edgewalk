import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import Info from '../Info/Info';
import Detail from '../Detail';

const ViewEntry = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  console.log(`props.details: `, props.idStr);

  return (
    <div>
      <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
          <Info idStr={props.idStr} />
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

export default ViewEntry;


/*
// <Info idStr={props.idStr} />
*/
