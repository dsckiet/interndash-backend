require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  try{
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('user already registered.');

    user = new User({
      name: req.body.name, email: req.body.email, password: req.body.password, role: req.body.role
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).json({user, message: 'success'});
  } catch(err) {
    res.status(400).json({message: 'error', user: null});
  }
};

module.exports = {
  registerUser
}
