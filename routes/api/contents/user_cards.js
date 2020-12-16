const express = require('express');

//import MongoDB Model
const User = require('../../../models/User');

const router = express.Router();
router.get('/', (req, res) => {
  User.find({ gender: req.query.gender }, (err, user) => {
    if (!user) {
      return res.json({ loadData: false });
    }
    return res.json(user);
  });
});
module.exports = router;
