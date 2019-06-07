const mysql     = require('../dbcon.js');

/***************************************
*** Get all for displaying in tables ***
***************************************/

//select all from devices table
function getDevices(res, mysql, context, complete){
  mysql.pool.query("SELECT * FROM devices", function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      context.devices = results;
      complete();
  });
}

//get information of single device
function getDevice(res, mysql, context, device_id, done){
  const sql_query = `SELECT devices.id, devices.name, devices.manufacturer, devices.deviceOnOff, devices.currentEnergyUsage, devices.averageEnergyUsage FROM devices WHERE devices.id = ?`
  const inserts = [device_id];
  mysql.pool.query(sql_query, inserts, (err, result, fields) => {
      if(err){
          console.log(err);
          res.write(JSON.stringify(err));
          res.end()
      }
      context.device = result[0];
      done();
  })
}

//get 1 device from search
function searchDevices(res, mysql, context, name, complete){
  //console.log('in searchDevices');
  let sql = "SELECT * from devices WHERE devices.name = ?";
  let inserts = [name];
  mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      context.devices = results;
      complete();
  });
}

let deviceController = {

  getSearchResult: (req, res) => {
    let callbackCount = 0;
    let context = {};
    searchDevices(res, mysql, context, req.query.name, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 1)
        {
            res.setHeader('data', JSON.stringify(context));
            res.render('devices', context);
        }
    }
  },

  getAllDevices: (req, res) => {
    if(req.session.email != null)
    {
        let callbackCount = 0;
        let context = {};
        getDevices(res, mysql, context, complete);
        context.session = req.session;

        function complete()
        {
            callbackCount++;
            if(callbackCount >= 1)
            {
                res.setHeader('data', JSON.stringify(context));
                res.render('devices', context);
            }
        }
    }
    else
    {
      req.flash('error_msg', 'Please log in before visiting Devices Page')
      return res.redirect('./login');
    }
  },

  getSingleDevice: (req, res) => {
    if(req.session.email != null) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatedevice.js"];
        var mysql = req.app.get('mysql');
        getDevice(res, mysql, context, req.params.device_id, done);
        function done() 
        {
            callbackCount++;
            if (callbackCount >= 1)
            {
                res.setHeader('data', JSON.stringify(context));
                res.render('updateDevice', context);
            }
        }
    }
    else
    {
        req.flash('error_msg', 'Please log in before visiting Device Page')
        return res.redirect('/login');
    }
  },

  updateSingleDevice: (req, res) => {
    var mysql = req.app.get('mysql');
    var sql_query = `UPDATE devices SET name = ?, manufacturer = ?, deviceOnOff = ? WHERE id = ?;`;
    var inserts = [req.body.name, req.body.manufacturer, req.body.deviceOnOff, req.params.device_id];

    sql = mysql.pool.query(sql_query, inserts, (err, results, fields) => {
      if(err) 
      {
          res.send(500);
      } 
      else 
      {
          res.status(200);
          res.end();
      }
    });
  }

  

  
}

module.exports = deviceController
