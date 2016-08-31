const expect = require('chai').expect;
const Mongoose = require('mongoose');
const User = require('../server/resources/api/users/User');

describe('User Model', () => {

  it('should be a Mongoose model', () => {
    expect(new User()).to.be.instanceOf(Mongoose.Model);
  });

  it('should have a schema', () => {
    expect(User.schema).to.exist;
  });

  it('should have a `firstName` property', () => {
    expect(User.schema.paths.firstName).to.exist;
  });

  it('should have a `firstName` property that is a string', () => {
    expect(User.schema.paths.firstName.options.type.name).to.equal('String');
  });

  it('should have a `lastName` property', () => {
    expect(User.schema.paths.lastName).to.exist;
  });

  it('should have a `lastName` property that is a string', () => {
    expect(User.schema.paths.lastName.options.type.name).to.equal('String');
  });

  it('should have a `phoneNumber` property', () => {
    expect(User.schema.paths.phoneNumber).to.exist;
  });

  it('should have a `phoneNumber` property that is a string', () => {
    expect(User.schema.paths.phoneNumber.options.type.name).to.equal('String');
  });

  it('should have a `images` property', function () {
    expect(User.schema.paths.images).to.exist;
  });

  it('should have a `images` property that is an array', function () {
    expect(User.schema.paths.images.instance).to.equal('Array');
  });

  it('should have a `createdAt` property', () => {
    expect(User.schema.paths.createdAt).to.exist;
  });

  it('should have a `createdAt` property that is a date', () => {
    expect(User.schema.paths.createdAt.instance).to.equal('Date');
  });
});