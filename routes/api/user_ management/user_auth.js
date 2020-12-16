const express = require('express');
const auth = require('../../../middleware/auth');

const router = express.Router();

router.get('/', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    gender: req.user.gender,
    profileImage: req.user.profileImage,
    enteredUserInformation: req.user.enteredUserInformation,
  });
});

module.exports = router;
