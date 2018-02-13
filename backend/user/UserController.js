var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
// var rp = require('request-promise');
var request = require('request').defaults({ encoding: null });

var User = require('./User');

var VerifyToken = require('../auth/VerifyToken');
var CONSTANTS = require('../config/constants');

// Create new user
router.post('/', VerifyToken, function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (user) return res.status(401).send('Usuário encontrado na base de dados');

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var avatar;

    request.get('https://api.adorable.io/avatars/300/' + req.body.email + '.png', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        avatar = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
      } else {
        avatar = CONSTANTS.DEFAULT_AVATAR;
      }

      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        avatar: avatar
      }, function(err, user) {
        if (err) return res.status(500).send(res.__('USER.ERROR_CREATE'));

        res.status(200).send(user);
      });

    });

  });

  // res.status(200).send(avatar);


  // User.create({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: hashedPassword
  // }, function(err, user) {
  //   if (err) return res.status(500).send(res.__('USER.ERROR_CREATE'));

  //   res.status(200).send(user);
  // });
});

// Listing all users
router.get('/', VerifyToken, function(req, res) {
  User.find({}, { password: 0 }, function(err, users) {
    if (err) return res.status(500).send(res.__('USER.ERROR_FETCH_USERS'));

    res.status(200).send(users);
  })
});

// Get a single user
router.get('/:id', VerifyToken, function(req, res) {
  User.findById(req.params.id, { password: 0 }, function(err, user) {
    if (err) return res.status(500).send(res.__('USER.ERROR_FETCH_USER'));
    if (!user) return res.status(404).send(res.__('USER.NOT_FOUND'));

    res.status(200).send(user);
  });
});

// Delete a user
router.delete('/:id', VerifyToken, function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) return res.status(500).send(res.__('USER.ERROR_DELETE_USER'));

    res.status(200).send(res.__('USER.SUCCESS_DELETED', user.name));
  });
});

// Update a user
router.put('/:id', VerifyToken, function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true, password: 0 }, function(err, user) {
    if (err) return res.status(500).send(res.__('USER.ERROR_UPDATE_USER'));

    res.status(200).send(user);
  });
});

module.exports = router;
