const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, max: 255 },
    name: { type: String, required: true, max: 255 },
    password: { type: String, required: true, max: 1024},
    role: {type: String, enum: ["admin", "intern", "mentor"], required: true}
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, email: this.email, name: this.name, role: this.role }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1d' });
  return token;
}

module.exports = User = mongoose.model('user', userSchema);
