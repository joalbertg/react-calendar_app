import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement
// (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const closeModal = () => {
    console.log('Closing...');
    setIsOpen(false);
  }

  return(
    <Modal
      className='modal'
      overlayClassName='modal-fondo'
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
    >
      <h1>Hello world!!!</h1>
      <hr />
      <span>welcome back...</span>
    </Modal>
  );
}

