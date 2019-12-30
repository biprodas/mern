const winston = require('winston');
const mongoose = require('mongoose');
//const autoIncrement = require('mongoose-auto-increment');
//const Fawn = require("fawn");

module.exports = function(){
  const db = process.env.db || "mongodb://localhost/mern-stack";

  mongoose.connect(db,  { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => winston.info("Connected to Database..."))
  .catch(err => console.error('Connection failed...'));
  //autoIncrement.initialize(mongoose.connection);
  //Fawn.init(mongoose);
}

