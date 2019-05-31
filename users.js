module.exports = function() {
  let express = require('express');
  let router = express.Router();
  let mysql = require('./dbcon.js');

  function getUserInfo(res, mysql, context, user_email, done){
    const sql_query = `SELECT id, name, email FROM users WHERE email = ?`
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
    if(req.session.user != null)
    {
      return res.render('home', {
        title: 'Home',
        success: true,
        response: 'Login successful!',
        session: req.session,
      });
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
          return res.send("Found User!")
        }
        else
        {
          req.flash('error_msg', 'Email does not exist.')
          return res.redirect('/login')
        } 
      }
    }

    /* If user login was successful, setup the user session */
  })

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