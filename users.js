module.exports = function() {
  let express = require('express');
  let router = express.Router();
  let mysql = require('./dbcon.js');

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
        console.log(context);
        /* Find if user exists in the DB */
        if(context.user != null)
        {
          /* Compare the password */
          const user_input_password = req.body.password;
          const user_actual_password = context.user.password;
          console.log(user_input_password)
          console.log(user_actual_password)
          if(user_input_password === user_actual_password)
          {
            /* If user login was successful, setup the user session */
            req.session.cookie.maxAge = 60 * 60 * 1000;
            req.session.email = context.user.email;
            return res.render('home', {
              title: 'Home',
              name: context.user.name,
              success: true,
              response: 'Login successful!',
              session: req.session,
            });
          }
          else
          {
            req.flash('error_msg', 'Passpword is incorrect!')
            return res.redirect('/login')           
          }
        }
        else
        {
          req.flash('error_msg', 'Email does not exist.')
          return res.redirect('/login')
        } 
      }
    }
  })

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



  router.get('/settings', (req, res) => {
    /* hardcoded */
    return res.render('settings', {
      session: req.session,
      name: "test",
      email: "test@test.com"
    });
  })

  router.get('/settings/edit', (req, res) => {
    return res.render('updateUser');
  })

  return router;
}();