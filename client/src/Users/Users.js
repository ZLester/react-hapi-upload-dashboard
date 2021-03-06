import React, { PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router';
import { Image, Grid, Row, Col } from 'react-bootstrap';
import './Users.css';

const generateUsersData = users => users.map(user => ({
  id: user._id,
  name: `${user.firstName} ${user.lastName}`,
  phoneNumber: user.phoneNumber,
  images: user.images,
  user,
}));

const formatId = (handleUserIdClick, id) => {
  const link = (
    <Link
      to={{ pathname: `/users/${id}` }}
      onClick={() => handleUserIdClick(id)}
    >
      {id}
    </Link>
  );
  return (<div>{link}</div>);
};

const formatImages = (handleImageClick, images) => (
  <div>
    {images.map((image, index) => (
      <Image
        key={index}
        className="Users-image-preview"
        src={image.filepath}
        onClick={() => handleImageClick(image.filepath)}
        thumbnail
      />
    ))}
  </div>
);

const generateControlIcon = (clickHandler, icon, id) => {
  const clickCb = () => clickHandler(id);
  return (
    <i
      key={id + icon}
      className={`Users-control-icon fa fa-${icon}`}
      aria-hidden="true"
      onClick={clickCb}
    />
  );
};

const formatControls = (handleImageUploadClick, handleUserDeleteClick, handleUserIdClick, user) => {
  const UploadImage = generateControlIcon(handleImageUploadClick, 'upload', user.id);
  const RemoveUser = generateControlIcon(handleUserDeleteClick, 'remove', user.id);
  return (
    <div>
      {UploadImage}
      {RemoveUser}
    </div>
  );
};

const Users = ({ users, handleImageUploadClick, handleUserDeleteClick, handleImageClick, handleUserIdClick }) => {
  const usersData = generateUsersData(users);
  const formatIdBound = formatId.bind(null, handleUserIdClick);
  const formatImagesBound = formatImages.bind(null, handleImageClick);
  const formatControlsBound = formatControls.bind(null, handleImageUploadClick, handleUserDeleteClick);
  const tableOptions = {
    defaultSortName: 'id',
    defaultSortOrder: 'asc',
  };
  return (
    <div>
      <Grid>
        <Row className="show-grid">
          <Col md={12}>
            <BootstrapTable
              data={usersData}
              options={tableOptions}
              striped
              hover
            >
              <TableHeaderColumn
                dataField="id"
                dataAlign="center"
                isKey
                dataSort
                dataFormat={formatIdBound}
              >
                ID
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="name"
                dataAlign="center"
                dataSort
              >
                Name
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="phoneNumber"
                dataAlign="center"
              >
                Phone Number
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="images"
                dataAlign="center"
                dataFormat={formatImagesBound}
              >
                Images
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="user"
                dataAlign="center"
                dataFormat={formatControlsBound}
              >
                Controls
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array,
  handleImageUploadClick: PropTypes.func,
  handleUserDeleteClick: PropTypes.func,
  handleImageClick: PropTypes.func,
};

export default Users;
