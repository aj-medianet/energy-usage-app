module.exports = function() {
  let express = require('express');
  let router = express.Router();
  let mysql = require('./dbcon.js');

  router.get('/login', (req, res) => {
    return res.render('login')
  });

  router.get('/logout', (req, res) => {
    return res.send('Logout Success Message Sent!')
  });

  router.get('/signup', (req, res) => {
    return res.render('signup')
  });

  router.get('/settings', (req, res) => {
    return res.render('settings');
  })

  router.get('/settings/edit', (req, res) => {
    return res.render('updateUser');
  })

  return router;
}();