const express = require('express');
const router = express.Router();
const User = require('../../../models/User');

router.post('/', (req, res) => {
  // =================
  //  OAUTH_LOGIN
  // =================
  if (req.body.oAuthId) {
    User.findOne({ oAuthId: req.body.oAuthId }, (err, user) => {
      if (!user) {
        const userSchema = new User(req.body);
        userSchema.save((err) => {
          if (err) return res.json({ success: false, err });
        });

        userSchema.generateToken((err, token) => {
          if (err) return res.status(400).send(err);
          res.cookie('x_auth', token).status(200).json({ loginSuccess: true, userId: userSchema._Id });
        });
      } else {
        user.generateToken((err, token) => {
          if (err) return res.status(400).send(err);
          res.cookie('x_auth', token).status(200).json({ loginSuccess: true, userId: user._Id });
        });
      }
    });
  } else {
    // =================
    //  NOMAL_LOGIN
    // =================
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: '해당 이메일에 해당하는 유저가 없습니다.',
        });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({
            loginSuccess: false,
            message: '비밀번호가 틀렸습니다.',
          });
      });
      user.generateToken((err, user) => {
        if (err) {
          res.cookie('x_auth', '');
          return res.status(400).send(err);
        }
        res.cookie('x_auth', user.token).status(200).json({ loginSuccess: true, userId: user._Id, token: user.token });
      });
    });
  }
});

module.exports = router;
