const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  images: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Image',
  }],
});

module.exports = Mongoose.model('User', userSchema);
