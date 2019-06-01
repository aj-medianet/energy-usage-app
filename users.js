module.exports = function() {
  const express   = require('express');
  const router    = express.Router();
  const mysql     = require('./dbcon.js');
  const CryptoJS  = require("crypto-js");

  function getUserInfo(res, mysql, context, user_email, done){
    const sql_query = `SELECT id, name, email, password FROM users WHERE email = ?`
    const inserts = [user_email];
    mysql.pool.query(sql_query, inserts, (err, result, fields) => {
        if(err){
            console.log(err);
            res.write(JSON.stringify(err));
            res.end()
        }
        context.user = result[0];
        done();
    })
}

  /********************************
  *** Main requests for Login   ***
  ********************************/
  
  /* Redirect User to HOME page if user has logged in */
  router.get('/login', (req, res) => {
    /* User has already login */
    if(req.session.email != null)
    {
      return res.redirect('./');
    }
    else
    {
      return res.render('login');
    }
  });

  /* Check if user input is valid */
  router.post('/login', (req, res) => {
    /* Search if user email is exist */
    callbackCount = 0;
    var context = {};
    var mysql = req.app.get('mysql');
    getUserInfo(res, mysql, context, req.body.email, done);
    function done() {
      callbackCount++;
      if (callbackCount >= 1)
      {
        /* Find if user exists in the DB */
        if(context.user != null)
        {
          /* Compare the password */
          const user_input_password = req.body.password;
          const user_actual_password = context.user.password;

          // var ciphertext = CryptoJS.AES.encryuser_input_passwordpt(, 'KEY');
          // console.log(ciphertext.toString());

          /* Decrypt the password stored in DB */
          const bytes  = CryptoJS.AES.decrypt(user_actual_password, 'KEY');
          const user_actual_password_decoded = bytes.toString(CryptoJS.enc.Utf8).toString();

          if(user_input_password === user_actual_password_decoded)
          {
            /* If user login was successful, setup the user session */
            req.session.cookie.maxAge = 60 * 60 * 1000;
            req.session.email = context.user.email;
            /* Render HOME page with session information updated */
            return res.render('home', {
              title: 'Home',
              name: context.user.name,
              success: true,
              response: 'Login successful!',
              session: req.session,
            });
          }
          /* Error: Password is incorrect */
          else
          {
            req.flash('error_msg', 'Passpword is incorrect!')
            return res.redirect('/login')           
          }
        }
        /* Error: Email not in DB */
        else
        {
          req.flash('error_msg', 'Email does not exist.')
          return res.redirect('/login')
        } 
      }
    }
  })

  /********************************
  *** Main requests for Logout  ***
  ********************************/

  router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if(err){
         console.log(err);
      }
      else
      {
        res.redirect('/login');
      }
   });
  });


  /********************************
  *** Main requests for Signup  ***
  ********************************/
  router.get('/signup', (req, res) => {
    /* User has already login */
    if(req.session.email != null)
    {
      return res.redirect('./');
    }
    else
    {
      return res.render('signup');
    }
  });


  router.post('/signup', (req, res) => {
    /* See if the input email exists in DB */

      /* Encode User insert passport */

      /* Store User information into DB */

      /* Refirect to the login page with flesh message - signup success */
    return res.redirect("./login")
  })


  /*********************************
  *** Main requests for Settings ***
  *********************************/
 
  /* Get all User information from DB */
  router.get('/settings', (req, res) => {
    /* hardcoded */
    return res.render('settings', {
      session: req.session,
      name: "test",
      email: "test@test.com"
    });
  })

  /* Redirect to Update Page */
  router.get('/settings/edit', (req, res) => {
    return res.render('updateUser');
  })
  /* Udate User Table */
  router.put('/setting/:user_id', (req, res) => {
    return res.redirect('/settings');
  })

  return router;
}();