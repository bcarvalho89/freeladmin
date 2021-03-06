var express = require('express');
var router = express.Router();

var VerifyToken = require('./VerifyToken');

var User = require('../user/User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.post('/register', function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  }, function(err, user) {
    if (err) return res.status(500).send(res.__('USER.ERROR_CREATE'));

    // create a token
    var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 86400 /* 24 hours */ });

    res.status(200).send({
      auth: true,
      token: token
    });
  });
});

router.post('/login', function(req, res) {

  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) return res.status(500).send(res.__('MISC.SERVER_ERROR'));
    if (!user) return res.status(404).send({
      auth: false,
      token: null,
      message: res.__('USER.NOT_FOUND')
    });

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        auth: false,
        token: null,
        message: res.__('LOGIN.INVALID_PASSWORD')
      });
    }

    var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 86400 /* 24 hours */ });

    res.status(200).send({
      auth: true,
      token: token
    });
  });

});

router.get('/me', VerifyToken, function(req, res) {
    User.findById(req.userId, { password: 0 /* remove password */}, function (err, user) {
      if (err) return res.status(500).send(res.__('USER.ERROR_FETCH_USER'));
      if (!user) return res.status(404).send(res.__('USER.NOT_FOUND'));

      res.status(200).send(user);

  });
});

module.exports = router;
