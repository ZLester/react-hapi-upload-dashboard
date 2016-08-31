import React, { PropTypes } from 'react';
import { Modal, Image } from 'react-bootstrap';

const ImageModal = ({ showImageModal, handleImageModalClose, targetImage }) => (
  <Modal show={showImageModal} onHide={handleImageModalClose}>
    <Modal.Header closeButton>
      <Modal.Title>Image Detail</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Image className="center-block" src={targetImage} responsive />
    </Modal.Body>
  </Modal>
);

ImageModal.propTypes = {
  showImageModal: PropTypes.bool.isRequired,
  handleImageModalClose: PropTypes.func.isRequired,
  targetImage: PropTypes.string,
};

export default ImageModal;
