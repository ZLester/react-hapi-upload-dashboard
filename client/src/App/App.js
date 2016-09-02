import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { bindAll } from 'class-bind';
import NavbarTop from '../NavTop';
import CreateUserModal from '../CreateUserModal';
import ErrorModal from '../ErrorModal';
import ImageModal from '../ImageModal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      targetUser: null,
      selectedUser: null,
      targetImage: null,
      showErrorModal: false,
      showCreateUserModal: false,
      showImageModal: false,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      image: null,
      loading: false,
    };
    bindAll(App.prototype);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    fetch('/api/users/')
      .then(res => res.json())
      .then(users => this.setState({ users }))
      .catch(() => this.handleError());
  }

  updateUser(updatedUser) {
    const updatedUsers = this.state.users.map(user => {
      if (user._id === updatedUser._id) {
        return updatedUser;
      }
      return user;
    });
    this.setState({ users: updatedUsers });
  }

  deleteUser(deletedUser) {
    const updatedUsers = this.state.users.filter(user => {
      if (user._id === deletedUser._id) {
        return false;
      }
      return true;
    });
    this.setState({ users: updatedUsers });
  }

  createUser(newUser) {
    const updatedUsers = [...this.state.users, newUser];
    this.setState({ users: updatedUsers });
  }

  handleImageUploadClick(id) {
    this.setState({ targetUser: id }, () => {
      const upload = ReactDOM.findDOMNode(this.refs.upload);
      upload.click();
    });
  }

  handleUserDeleteClick(id, callback) {
    fetch(`/api/users/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(deletedUser => {
        this.deleteUser(deletedUser);
        if (callback) {
          callback();
        }
      })
      .catch(() => this.setState({ targetUser: null, showErrorModal: true }));
  }

  handleUserCreateClick() {
    this.setState({ showCreateUserModal: true });
  }

  handleCreateUserSubmit() {
    const { firstName, lastName, phoneNumber, image } = this.state;
    const valid = firstName && lastName && phoneNumber && image;
    if (!valid) {
      return;
    }
    const body = new FormData();
    body.set('firstName', firstName);
    body.set('lastName', lastName);
    body.set('phoneNumber', phoneNumber);
    body.set('image', image);

    fetch('/api/users', {
      method: 'POST',
      body,
    })
      .then(res => res.json())
      .then(createdUser => {
        this.setState({ showCreateUserModal: false });
        this.createUser(createdUser);
      })
      .catch(() => this.handleError());
  }

  uploadImage(e) {
    const imageData = e.target.files[0];
    const body = new FormData();
    body.append('image', imageData);
    fetch(`/api/users/${this.state.targetUser}/images`, {
      method: 'POST',
      body,
    })
      .then(res => res.json())
      .then(updatedUser => {
        this.setState({ loading: false });
        this.updateUser(updatedUser);
      })
      .catch(() => this.handleError());
  }

  handleUserIdClick(id) {
    const user = this.state.users.reduce((foundUser, curUser) => {
      if (curUser._id === id) {
        return curUser;
      }
      return foundUser;
    }, null);
    this.setState({ selectedUser: user });
  }

  handleImageClick(src) {
    this.setState({ targetImage: src, showImageModal: true });
  }

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }

  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }

  handlePhoneNumberChange(e) {
    this.setState({ phoneNumber: e.target.value });
  }

  handleCreateUserImageChange(e) {
    this.setState({ image: e.target.files[0] });
  }

  handleErrorModalClose() {
    this.setState({ showErrorModal: false });
  }

  handleCreateUserModalClose() {
    this.setState({ showCreateUserModal: false });
  }

  handleImageModalClose() {
    this.setState({ showImageModal: false });
  }

  handleError() {
    this.setState({ targetUser: null, showErrorModal: true });
  }

  startLoading() {
    this.setState({ loading: true });
  }

  stopLoading() {
    this.setState({ loading: false });
  }

  render() {
    return (
      <div className="App">
        <NavbarTop
          handleUserCreateClick={this.handleUserCreateClick}
        />
        <div>
          {this.props.children && React.cloneElement(this.props.children, {
            users: this.state.users,
            selectedUser: this.state.selectedUser,
            handleImageUploadClick: this.handleImageUploadClick,
            handleUserIdClick: this.handleUserIdClick,
            handleUserDeleteClick: this.handleUserDeleteClick,
            handleImageClick: this.handleImageClick,
            handleError: this.handleError,
            startLoading: this.startLoading,
            stopLoading: this.stopLoading,
          })}
        </div>
        <ErrorModal
          showErrorModal={this.state.showErrorModal}
          handleErrorModalClose={this.handleErrorModalClose}
        />
        <CreateUserModal
          showCreateUserModal={this.state.showCreateUserModal}
          handleFirstNameChange={this.handleFirstNameChange}
          handleLastNameChange={this.handleLastNameChange}
          handlePhoneNumberChange={this.handlePhoneNumberChange}
          handleCreateUserImageChange={this.handleCreateUserImageChange}
          handleCreateUserModalClose={this.handleCreateUserModalClose}
          handleCreateUserSubmit={this.handleCreateUserSubmit}
        />
        <ImageModal
          showImageModal={this.state.showImageModal}
          handleImageModalClose={this.handleImageModalClose}
          targetImage={this.state.targetImage}
        />
        <input
          ref="upload"
          className="App-image-upload"
          type="file"
          onChange={this.uploadImage}
          style={{ display: 'none' }}
        />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
