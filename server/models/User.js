const jwt = require("jsonwebtoken");
const Joi = require('@hapi/joi');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true, },
  // email validation
  email: { type: String, required: true },
  // phone number validation
  phone: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  avatar: String,
  role: String,
  date: { type: Date, default: Date.now }
  //roles: [],
  //operations: []
});

userSchema.methods.generateAuthToken =  function() {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      username: this.username,
      isAdmin: this.isAdmin,
      avatar: this.avatar,
      role: this.roles
    },
    process.env.jwtPrivateKey
  );
  return token;
};

const User = mongoose.model("User", userSchema);

validateUser = user => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    username: Joi.string().alphanum().min(2).max(30).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    repeat_password: Joi.ref('password'),
    avatar: [Joi.string(), ""],
    role: [Joi.string(), ""]
  }).with('password', 'repeat_password');
  //const { error, value } = schema.validate(user);
  return schema.validate(user);;
}
validateLogin = user => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(2).max(30).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
  });
  return schema.validate(user);;
}

// exports.User = User;
// exports.validate = validateUser;
// exports.validateLogin = validateLogin;

module.exports = {
  User,
  validateUser,
  validateLogin
}



