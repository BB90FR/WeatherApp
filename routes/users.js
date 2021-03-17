var express = require('express');
var router = express.Router();
const userModel = require('../models/users'); 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// Sign up
router.post('/sign-up', async (req, res) => {

  const searchUser = await userModel.findOne({ email: req.body.email });
  
  if(searchUser == null) {
    let newUser = new userModel ({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    req.session.user = await newUser.save();
    res.redirect('/weather');
  } else {
    res.render('login');
  }
});



// Sign in
router.post('/sign-in', async (req, res) => {

  const searchUser = await userModel.findOne({ email: req.body.email, password: req.body.password });
  
  if(searchUser != null) {
    req.session.user = searchUser;
    res.redirect('/weather');
  } else {
    res.render('login', {})
  };
});



// Log out
router.get('/log-out', (req, res) => {
  req.session.user = null;
  res.redirect('/');
});


module.exports = router;
