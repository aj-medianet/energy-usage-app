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

          /* Decrypt the password stored in DB */
          const bytes  = CryptoJS.AES.decrypt(user_actual_password, 'KEY');
          const user_actual_password_decoded = bytes.toString(CryptoJS.enc.Utf8).toString();

          if(user_input_password === user_actual_password_decoded)
          {
            /* If user login was successful, setup the user session */
            req.session.cookie.maxAge = 60 * 60 * 1000;
            req.session.email = context.user.email;
            req.session.name = context.user.name;
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
      const {email, name, password, confirmPassword} = req.body
      let errors = []
      if(password != confirmPassword) {
        errors.push({ msg: 'Password do not match.'})
      }

      console.log(errors)

      if(errors.length > 0) 
      {
        return res.render('signup', {errors, email, name, password, confirmPassword})
      }
      else 
      {
        /* Check if the user is in the DB */  
        callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getUserInfo(res, mysql, context, email, done);

        function done() {
          callbackCount++;
          if (callbackCount >= 1)
          {
            if (context.user) 
            {
              console.log(context.user)
              /* Found the user in the DB */
              errors.push({ msg : 'Email already exists.'});
              return res.render('signup', {errors, email, name, password, confirmPassword})      
            }
            else 
            {
               /* Encode User insert passport */
              const hashed_password = CryptoJS.AES.encrypt(password, 'KEY');
              // console.log(email);
              // console.log(name);
              // console.log(hashed_password.toString());
              
              /* Store User information into DB */
              let sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
              let inserts = [name, email, hashed_password.toString()];
              sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
                  if (error) {
                      res.write(JSON.stringify(error));
                      res.end()
                  } else {
                      console.log("New User created: " + email)
                      /* Redirect to the login page with flesh message - signup success */
                      req.flash('success_msg', 'You are now registered and can log in.')
                      return res.redirect('/login')
                  }
              })
            } // Not in DB
          } // Search in DB
        } // Callback
      } // Same input passport
  })


  /*********************************
  *** Main requests for Settings ***
  *********************************/
 
  /* Get all User information from DB */
  router.get('/settings', (req, res) => {
    if(req.session.email != null)
    {
      callbackCount = 0;
      var context = {};
      var mysql = req.app.get('mysql');
      context.jsscripts = ["deleteuser.js"];
      getUserInfo(res, mysql, context, req.session.email, done);
      function done() {
        callbackCount++;
        if (callbackCount >= 1)
        {
          req.session.name = context.user.name; // Update user name
          return res.render('settings', {
            session: req.session,
            id: req.session.id,
            name: req.session.name,
            email: req.session.email,
            jsscripts: context.jsscripts
          });
        }
      }
    }
    else
    {
      req.flash('error_msg', 'Please log in before visiting Settings Page')
      return res.redirect('./login');
    }
  })

  /* Redirect to Update Page */
  router.get('/settings/:user_id', (req, res) => {
    callbackCount = 0;
    var context = {};
    context.url = req.params;
    getUserInfo(res, mysql, context, req.session.email, done);
    function done() {
      callbackCount++;
      if (callbackCount >= 1)
      {
        return res.render('updateUser', context);
      }
    }
  })


  /* Udate User Table */
  router.post('/settings/:user_id', (req, res) => {
    const email = req.session.email;
    const updatedName = req.body.updatedName;
    var mysql = req.app.get('mysql');
    var sql_query = `UPDATE users SET name = ? WHERE email = ?`;
    var inserts = [updatedName, email];

    sql = mysql.pool.query(sql_query, inserts, (err, results, fields) => {
      if(err) {
          res.send(500);
      } else {
          console.log("Updated User Name");
          return res.redirect('/settings');
      }
    });
  })

  /* Delete user from database */
  router.delete('/settings/:user_id', (req, res) => {
    // console.log("Delete button pressed!");
    var mysql = req.app.get('mysql');
    var sql_query = "DELETE User FROM users User WHERE User.email = ?";
    var inserts = req.session.email;

    sql = mysql.pool.query(sql_query, inserts, (err, result, fields) => {
        if(err) {
            res.send(500);
        } else {
            res.status(202);
            res.end();
        }
    });
});

  return router;
}();