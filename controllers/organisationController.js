require('dotenv').config();
const Organisation = require('../models/organisation');
const User = require('../models/user');

const createOrganisation = async (req, res) => {
  const role = req.user.role;
  try{
    let user = await User.findOne({email: req.user.email, role: ['mentor','admin']});
    if(!user) return res.status(400).json({message: 'not authorised.'});

    let { name, email, description, mobile, location, mentor } = req.body;
    let organisation = new Organisation({
      name, email, description, mobile, location, mentor
    });

    await organisation.save();

    res.status(200).json({organisation, message: 'organisation created'});
  } catch(err) {
    console.log(err);
    res.status(400).json({message: 'error', organisation: null});
  }
};

module.exports = {
  createOrganisation
}
