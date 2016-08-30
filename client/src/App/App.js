import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import NavbarTop from '../NavTop';
import CreateUserModal from '../CreateUserModal';
import ErrorModal from '../ErrorModal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      targetUser: null,
      showErrorModal: false,
      showCreateUserModal: false,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      image: null,
    };
    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleImageUploadClick = this.handleImageUploadClick.bind(this);
    this.handleUserCreateClick = this.handleUserCreateClick.bind(this);
    this.handleUserDeleteClick = this.handleUserDeleteClick.bind(this);
    this.handleErrorModalClose = this.handleErrorModalClose.bind(this);
    this.handleCreateUserImageChange = this.handleCreateUserImageChange.bind(this);
    this.handleCreateUserModalClose = this.handleCreateUserModalClose.bind(this);
    this.handleCreateUserSubmit = this.handleCreateUserSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    fetch('/api/users/')
      .then(res => res.json())
      .then(users => this.setState({ targetUser: null, users }))
      .catch(() => this.setState({ targetUser: null, showErrorModal: true }));
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
    const users = this.state.users.slice();
    users.push(newUser);
    this.setState({ users });
  }

  handleImageUploadClick(id) {
    this.setState({ targetUser: id }, () => {
      const upload = ReactDOM.findDOMNode(this.refs.upload);
      upload.click();
    });
  }

  handleUserDeleteClick(id) {
    fetch(`/api/users/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(deletedUser => this.deleteUser(deletedUser))
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
      .catch(() => this.setState({ showErrorModal: true }));
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
      .catch(() => this.setState({ showErrorModal: true }));
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


  render() {
    return (
      <div className="App">
        <NavbarTop
          handleUserCreateClick={this.handleUserCreateClick}
        />
        <div>
          {this.props.children && React.cloneElement(this.props.children, {
            users: this.state.users,
            handleImageUploadClick: this.handleImageUploadClick,
            handleUserDeleteClick: this.handleUserDeleteClick,
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
