import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

const ViewEntry = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  function renderImage(host, id) {
    const c = host + id
    return (
        <img src={c} />
      );
  }

  return (
    <div>
      <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
          // {renderImage('http://localhost:8080/files/', '5dd5a21befe3b78e670e39ba')}

          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

export default ViewEntry;
