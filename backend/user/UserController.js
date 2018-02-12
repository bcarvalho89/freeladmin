var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var User = require('./User');

var VerifyToken = require('../auth/VerifyToken');

// Create new user
router.post('/', VerifyToken, function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  }, function(err, user) {
    if (err) return res.status(500).send('There was a problem adding the information to the database.');

    res.status(200).send(user);
  });
});

// Listing all users
router.get('/', VerifyToken, function(req, res) {
  console.log(req);

  User.find({}, { password: 0 }, function(err, users) {
    if (err) return res.status(500).send('There was a problem finding the users.');

    res.status(200).send(users);
  })
});

// Get a single user
router.get('/:id', VerifyToken, function(req, res) {
  User.findById(req.params.id, { password: 0 }, function(err, user) {
    if (err) return res.status(500).send('There was a problem finding the user.');
    if (!user) return res.status(404).send('User not found');

    res.status(200).send(user);
  });
});

// Delete a user
router.delete('/:id', VerifyToken, function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) return res.status(500).send('There was a problem deleting the user.');

    res.status(200).send('User: ' + user.name + ' was deleted.');
  });
});

// Update a user
router.put('/:id', VerifyToken, function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true, password: 0 }, function(err, user) {
    if (err) return res.status(500).send('There was a problem updating the user.');

    res.status(200).send(user);
  });
});

module.exports = router;
