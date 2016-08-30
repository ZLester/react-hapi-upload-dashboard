import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ErrorModal = ({ showErrorModal, handleErrorModalClose }) => (
  <Modal show={showErrorModal} onHide={handleErrorModalClose}>
    <Modal.Header closeButton>
      <Modal.Title>Error</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Sorry, there was an error while processing your request.</p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={handleErrorModalClose}>Close</Button>
    </Modal.Footer>
  </Modal>
);

ErrorModal.propTypes = {
  showErrorModal: PropTypes.bool.isRequired,
  handleErrorModalClose: PropTypes.func.isRequired,
};

export default ErrorModal;
