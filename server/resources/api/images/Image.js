const Mongoose = require('mongoose');

const imageSchema = new Mongoose.Schema({
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  filepath: {
    type: String,
  },
  headers: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model('Image', imageSchema);
