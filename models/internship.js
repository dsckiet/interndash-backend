const mongoose = require('mongoose');
const user = require('./user');
const organization = require('./organization');

const internshipSchema = new mongoose.Schema({
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'organization'
  },
  postedOn: {
    type: Date,
    default: new Date()
  },
  expiresOn: {
    type: Date,
    default: function(){
      return this.postedOn.getMonth() + 2
    }
  },
  location: {
    type: String,
    required: true
  },
  stipend: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = Internship = mongoose.model('internship', internshipSchema);
