import React, { PropTypes, Component } from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import './UserEntry.css';

class UserEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: this.props.selectedUser,
      notFound: false,
    };
  }

  componentDidMount() {
    if (!this.state.selectedUser) {
      this.fetchUser(this.props.params.id);
    }
  }

  fetchUser(id) {
    fetch(`/api/users/${id}`)
      .then(res => res.json())
      .then(selectedUser => { 
        if (selectedUser.error) {
          return this.setState({ notFound: true });
        }
        this.setState({ selectedUser });
      })
      .catch(() => this.props.handleError());
  }

  generateUserDisplay(user) {
    const handleDelete = () => {
      this.props.handleUserDeleteClick(user._id, () => {
        this.setState({ selectedUser: null, notFound: true });
      });
    };
    const title = (
      <h3>
        <i className="UserEntry-user-icon fa fa-user" aria-hidden="true" />
        {`${user.firstName} ${user.lastName}`}
        <i
          className="UserEntry-close-icon fa fa-remove pull-right"
          aria-hidden="true"
          onClick={handleDelete}
        />
      </h3>
    );
    return (
      <Panel className="panel-info" header={title}>
        Placeholder
      </Panel>
    );
  }

  render() {
    if (!this.state.selectedUser) {
      if (this.state.notFound) {
        return (
          <h3 className="text-center">No User by that ID</h3>
        );
      }
      return (
        <h3 className="text-center">Loading User Data...</h3>
      );
    }
    const userDisplay = this.generateUserDisplay(this.state.selectedUser);
    return (
      <Grid>
        <Row className="show-grid">
          <Col md={6} mdOffset={3}>
            {userDisplay}
          </Col>
        </Row>
      </Grid>
    );
  }
}

UserEntry.propTypes = {
  selectedUser: PropTypes.object,
};

export default UserEntry;
