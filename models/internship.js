const mongoose = require('mongoose');
const user = require('./user');
const organisation = require('./organisation');

const internshipSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'organisation'
  },
  postedOn: {
    type: Date,
    default: Date.now
  },
  expiresOn: {
    type: Date,
    default: function(){
      return new Date(new Date(this.postedOn).getFullYear(), new Date(this.postedOn).getMonth() + 2, new Date(this.postedOn).getDate(), new Date(this.postedOn).getHours())
    }
  },
  location: {
    type: String,
    required: true
  },
  stipend: {
    type: String,
    required: true
  },
  status: {
    type: String,
    require: true,
    enum: ['active', 'inactive']
  },
  intern: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: true
});

module.exports = Internship = mongoose.model('internship', internshipSchema);
