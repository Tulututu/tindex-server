const User = require('../models/User');

let auth = (req, res, next) => {
  let token = req.cookies.x_auth;

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: token });
    req.token = token;
    req.user = user;
    next();
  });

  //유저가 있으면 인증 허가
  //없으면 불허가
};

module.exports = auth;
