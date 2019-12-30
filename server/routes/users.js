const Joi = require('@hapi/joi');
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validateUser, validateLogin } = require("../models/User");
const express = require("express");
const router = express.Router();


// @route   GET api/api_key/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => {
  res.send('User works..');
});

// @route   GET api/api_key/users
// @desc    Get all the users
// @access  Public
router.get('/', async (req, res) => {
  const users = await User.find({}).sort('name').select('-password');
  res.send(users);
});

// @route   GET api/api_key/users/me
// @desc    Get the current user
// @access  Private
router.get("/me", auth, async (req, res) => {
  if(!req.user) return res.send("No user exits");
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// @route   POST api/api_key/users/register
// @desc    Register user / Returing JWT Token
// @access  Public
router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("Username already exists.");
  
  user = _.pick(req.body, ["name", "username", "password", "role", "email", "phone", "avatar"]);
  
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  
  //console.log(user);

  user = new User(_.pick(user, ["name", "username", "password", "role"]));
  await user.save();

  const token = user.generateAuthToken();
  res
  .header("x-auth-token", token)
  .send(_.pick(user, ["_id", "name", "username", "isAdmin", "role", "email", "phone", "avatar"]));
});

// @route   PUT api/api_key/users
// @desc    Update username / password
// @access  Public
router.put("/:id", async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (user && user._id.toString() !== req.params.id) return res.status(400).send("Username already exists.");

  user = await User.findById(req.params.id);
  if(!user) return res.status(400).send("User does not exists.");

  if(!req.body.password) return res.status(400).send('Invalid Username or password.');
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid username or password.');

  // Now update
  user = {};
  const salt = await bcrypt.genSalt(10);
  if(req.body.username) user.username = req.body.username;
  if(req.body.newPassword) user.password = await bcrypt.hash(req.body.newPassword, salt);

  user = await User.findByIdAndUpdate(req.params.id, user, {new: true});

  const token = user.generateAuthToken();
  res
  .header("x-auth-token", token)
  .send(_.pick(user, ["_id", "name", "username", "isAdmin", "role", "email", "phone", "avatar"]));
});

// @route   POST api/api_key/users/login
// @desc    Login user / Returing JWT Token
// @access  Public
router.post('/login', async (req, res) => {
  const { error } = validateLogin(req.body); 
  //if (error) return res.status(400).send(error.details[0].message);
  if (error) return res.status(400).send("Invalid email or password.");

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  res.send(token);
});

// function validateLogin(req) {
//   const schema = {
//     username: Joi.string().required(),
//     password: Joi.string().required()
//   };
//   return Joi.validate(req, schema);
// }


module.exports = router;