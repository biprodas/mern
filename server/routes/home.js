const express = require('express');
const router = express.Router();

// Test api
router.get('/', (req, res) => {
  res.send('<h3>Hello Node API..<h3>');
});



module.exports = router;