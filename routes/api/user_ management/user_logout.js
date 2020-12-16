const express = require('express');
const auth = require('../../../middleware/auth');

//import MongoDB Model
const User = require('../../../models/User');

const router = express.Router();

// Logout
router.get('/', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).cookie('x_auth', '').send({
      success: true,
    });
  });
});

module.exports = router;
