require('dotenv').config();
const Organisation = require('../models/organisation');
const User = require('../models/user');

const createOrganisation = async (req, res) => {
  const role = req.user.role;
  try{
    let user = await User.findOne({email: req.user.email, role: ['mentor','admin']});
    if(!user) return res.status(400).json({message: 'not authorised.'});

    let organisation = await Organisation.findOne({ $or: [{email: req.body.email}, {mobile: req.body.mobile}]});
    if(organisation) return res.status(200).json({message: "mobile number or email is already registered"});

    let { name, email, description, mobile, location, mentor, website } = req.body;
    organisation = new Organisation({
      name, email, description, mobile, location, mentor, website
    });

    await organisation.save();

    res.status(200).json({organisation, message: 'organisation created'});
  } catch(err) {
    return res.status(400).json({message: err.message, organisation: null});
  }
};

module.exports = {
  createOrganisation
}
