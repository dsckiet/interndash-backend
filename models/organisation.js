const mongoose = require('mongoose');
const user = require('./user');

const organizationSchema = new mongoose.Schema({
  mentor: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    max: 255,
    required: true
  },
  mobile: {
    type: String,
    unique: true,
    max: 10,
    required: true
  },
  location: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = Organization = mongoose.model('organization', organizationSchema);
