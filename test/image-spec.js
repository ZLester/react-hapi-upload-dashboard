const expect = require('chai').expect;
const Mongoose = require('mongoose');
const Image = require('../server/resources/api/images/Image');

describe('Image Model', () => {

  it('should be a Mongoose model', () => {
    expect(new Image()).to.be.instanceOf(Mongoose.Model);
  });

  it('should have a schema', () => {
    expect(Image.schema).to.exist;
  });

  it('should have a `user` property', () => {
    expect(Image.schema.paths.user).to.exist;
  });

  it('should have a `user` property that is an object ID', () => {
    expect(Image.schema.paths.user.options.type.name).to.equal('ObjectId');
  });

  it('should have a `filepath` property', () => {
    expect(Image.schema.paths.filepath).to.exist;
  });

  it('should have a `filepath` property that is a string', () => {
    expect(Image.schema.paths.filepath.options.type.name).to.equal('String');
  });

  it('should have a `headers` property', () => {
    expect(Image.schema.paths.headers).to.exist;
  });

  it('should have a `headers` property that is an object', () => {
    expect(Image.schema.paths.headers.options.type.name).to.equal('Object');
  });

  it('should have a `createdAt` property', () => {
    expect(Image.schema.paths.createdAt).to.exist;
  });

  it('should have a `createdAt` property that is a date', () => {
    expect(Image.schema.paths.createdAt.instance).to.equal('Date');
  });
});