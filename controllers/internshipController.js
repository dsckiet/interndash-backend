require('dotenv').config();
const Internship = require('../models/internship');
const Organisation = require('../models/organisation');

const postInternship = async (req, res) => {
  const role = req.user.role;
  try{
    let user = await User.findOne({email: req.user.email, role: ['mentor','admin']});
    if(!user) return res.status(400).json({message: 'not authorised.'});

    let org = await Organisation.findOne({mentor: user._id});
    if(!org) return res.status(200).json({message: 'oops!, not a valid person to post an internship'});

    let { title, stipend, description, organisation, location, postedBy } = req.body;
    let internship = new Internship({
      title, stipend, description, organisation, location, postedBy
    });

    await internship.save();

    res.status(200).json({internship, message: 'internship posted'});
  } catch(err) {
    console.log(err);
    res.status(400).json({message: 'error', internship: null});
  }
};

const getInternships = async (req, res) => {
  try {
    let internships = await Internship.find()
      .select('title stipend location')
      .populate('organisation', 'name');

    res.status(200).json({message: 'success', internships});
  } catch (err) {
    res.status(400).json({message: 'error', internships: null});
  }
}

module.exports = {
  postInternship, getInternships
}
