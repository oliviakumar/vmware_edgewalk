  import React, { useState } from 'react';
  import './Zoom.css';

  class Zoom extends React.Component {
    state = { show: false }

    showModal = () => {
      this.setState({ show: true });
    }

    hideModal = () => {
      this.setState({ show: false });
    }

    render() {
      return (
        <main>
          <Modal show={this.state.show} handleClose={this.hideModal} >
            <p>Modal</p>
            <p>Data</p>
          </Modal>
        </main>
      )
    }
  }

  const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    return (
      <div className={showHideClassName}>
        <section className='modal-main'>
          {children}
          <button
            onClick={handleClose}
          >
            Close
          </button>
        </section>
      </div>
    );
  };


//   const container = document.createElement('div');
//   document.body.appendChild(container);
//   ReactDOM.render(<App />, container);
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// const Zoom = (props) => {
//   const {
//     buttonLabel,
//     className
//   } = props;

//   const [modal, setModal] = useState(false);

//   const toggle = () => setModal(!modal);

//   return (
//     <div>
//       <Button color="danger" onClick={toggle}>{props.buttonLabel}</Button>
//       <Modal isOpen={modal} toggle={toggle} className={className}>
//         <ModalHeader toggle={toggle}>Modal title</ModalHeader>
//         <ModalBody>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//         </ModalBody>
//         <ModalFooter>
//           <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
//           <Button color="secondary" onClick={toggle}>Cancel</Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// }

// export default Zoom;
// // import React, { useState } from 'react';
// // import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

// // const Zoom = (props) => {
// //   const [popoverOpen, setPopoverOpen] = useState(false);

// //   const toggle = () => setPopoverOpen(!popoverOpen);

// //   return (
// //     <div>
// //       <Button id="Popover1" type="button">
// //         Launch Popover
// //       </Button>
// //       <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
// //         <PopoverHeader>Popover Title</PopoverHeader>
// //         <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
// //       </Popover>
// //     </div>
// //   );
// // }

export default Zoom;
