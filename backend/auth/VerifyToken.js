var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      auth: false,
      message: res.__('MISC.MISSING_TOKEN')
    });
  }

  // verifies secret and check exp
  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: res.__('MISC.TOKEN_INVALID')
      });
    }

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;

    next();
  });
}

module.exports = verifyToken;
