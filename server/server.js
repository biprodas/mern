const express = require('express');
const winston = require('winston');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

console.log(`Process Environment: ${process.env.NODE_ENV}`);

const app = express();


//app.use('/public', express.static(__dirname + '/public/upload'));
//app.use(cors());
app.use(cors({
  exposedHeaders: ['x-auth-token']
}));
//app.use(bodyParser.json());

require('./startup/logging')();
require('./startup/db')();
require('./startup/routes')(app);
require('./startup/config')();
//require('./startup/validation')();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// Listening on port
const port = process.env.PORT || 5000;
const server = app.listen(port, () => 
  winston.info(`Server running on port ${port}...`)
);

module.exports  = server;