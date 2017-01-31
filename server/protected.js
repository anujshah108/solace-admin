const router = require('express').Router();
const jwt = require('express-jwt');
const config  = require('./config');
const db = require('../db');
const User = db.model('users');

const jwtCheck = jwt({
  secret: config.secret
});

router.use('/', jwtCheck);

router.get('/:email', function(req, res) {
  const userEmail = req.params.email;
  User.findOne({
    where: {
      email: userEmail
    }
  })
  .then(currentUser => {
    res.sendStatus(200);
  })
  .catch(next);
});


module.exports = router;
