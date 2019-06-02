module.exports = function() {
  const express   = require('express');
  const router    = express.Router();
  const mysql     = require('../dbcon.js');
  const CryptoJS  = require("crypto-js");
  const userController = require('../controllers/userController')

  /********************************
  *** Main requests for Login   ***
  ********************************/
  
  /* Redirect User to HOME page if user has logged in */
  router.get('/login', userController.getUserLoginView);

  /* Check if user input is valid */
  router.post('/login', userController.userLogin);

  /********************************
  *** Main requests for Logout  ***
  ********************************/

  /* Clean up the session for user */
  router.get('/logout', userController.userLogout);

  /********************************
  *** Main requests for Signup  ***
  ********************************/

  /* Get User Signp Page */
  router.get('/signup', userController.getUserSignupView);

  /* Create a new user account */
  router.post('/signup', userController.userSignup);

  /*********************************
  *** Main requests for Settings ***
  *********************************/
 
  /* Get all User information from DB */
  router.get('/settings', userController.getSettingsView);

  /* Redirect to Update Page */
  router.get('/settings/:user_id', userController.getUserInformationToUpdate)

  /* Udate User Table */
  router.post('/settings/:user_id', userController.updateUserName)

  /* Delete user from database */
  router.delete('/settings/:user_id', userController.deleteUser);

  return router;
}();