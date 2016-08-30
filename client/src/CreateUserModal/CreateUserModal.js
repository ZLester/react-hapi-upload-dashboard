import React, { PropTypes } from 'react';
import { Modal, Button, Row, Col, Form, FormGroup, FormControl, InputGroup } from 'react-bootstrap';

const CreateUserModal = (props) => (
  <Modal show={props.showCreateUserModal} onHide={props.handleCreateUserModalClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add User</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row>
        <Col>
          <Form horizontal>
            <FormGroup controlId="formHorizontalFirstName">
              <Col sm={1} md={1} />
              <Col sm={10} md={10}>
                <InputGroup>
                  <InputGroup.Addon className="input-icon">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </InputGroup.Addon>
                  <FormControl
                    type="text"
                    placeholder="First Name"
                    onChange={props.handleFirstNameChange}
                  />
                </InputGroup>
              </Col>
              <Col sm={1} md={1} />
            </FormGroup>
            <FormGroup controlId="formHorizontalLastName">
              <Col sm={1} md={1} />
              <Col sm={10}md={10}>
                <InputGroup>
                  <InputGroup.Addon className="input-icon">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </InputGroup.Addon>
                  <FormControl
                    type="text"
                    placeholder="Last Name"
                    onChange={props.handleLastNameChange}
                  />
                </InputGroup>
              </Col>
              <Col sm={1} md={1} />
            </FormGroup>
            <FormGroup controlId="formHorizontalPhoneNumber">
              <Col sm={1} md={1} />
              <Col sm={10} md={10}>
                <InputGroup>
                  <InputGroup.Addon className="input-icon">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                  </InputGroup.Addon>
                  <FormControl
                    type="text"
                    placeholder="Phone Number"
                    onChange={props.handlePhoneNumberChange}
                  />
                </InputGroup>
              </Col>
              <Col sm={1} md={1} />
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
              <Col sm={1} md={1} />
              <Col sm={10} md={10}>
                <InputGroup>
                  <FormControl
                    type="file"
                    label="Upload Image"
                    onChange={props.handleCreateUserImageChange}
                  />
                </InputGroup>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={1} md={1} />
              <Col sm={10} md={10}>
                <Button
                  className="pull-right"
                  onClick={props.handleCreateUserSubmit}
                >
                  Submit
                </Button>
              </Col>
              <Col sm={1} md={1} />
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Modal.Body>
  </Modal>
);

CreateUserModal.propTypes = {
  showCreateUserModal: PropTypes.bool,
  handleCreateUserModalClose: PropTypes.func,
  handleCreateUserSubmit: PropTypes.func,
  handleCreateUserImageChange: PropTypes.func,
  handleFirstNameChange: PropTypes.func,
  handleLastNameChange: PropTypes.func,
  handlePhoneNumberChange: PropTypes.func,
};

export default CreateUserModal;
