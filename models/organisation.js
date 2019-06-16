const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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

module.exports = Organisation = mongoose.model('Organisation', organizationSchema);

// only admin and mentor can create organisations
