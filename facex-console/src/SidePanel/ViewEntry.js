import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import Info from '../Info/Info';

const ViewEntry = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // console.log(`props.details: `, props.details);

  return (
    <div>
      <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <Info />
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

export default ViewEntry;
