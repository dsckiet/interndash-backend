require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  try {
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(200).json({message: 'user already registered.', user});

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

const loginUser = async (req, res) => {
  try {
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(200).json({message: 'user is not registered', user: null, token : null});

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(200).json({message: 'incorrect password', user: null, token : null});

    const token = user.generateAuthToken();
    res.status(200).json({token, message:'success', user});
  } catch (err) {
    console.log(err);
    res.status(400).json({token: null, message: 'error', user: null});
  }
}

module.exports = {
  registerUser, loginUser
}
