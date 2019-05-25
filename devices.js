module.exports = function() {
    let express = require('express');
    let router = express.Router();
    let mysql = require('./dbcon.js');


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
        const sql_query = `SELECT devices.id, devices.name, devices.manufacturer, devices.deviceOnOff, devices.currentEnergyUsage FROM devices WHERE devices.id = ?`
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
    

    /*************
    *** Search ***
    *************/

    //get 1 device from search 
    function search(res, mysql, context, name, complete){
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

    //device page from search
    router.get('/search', function(req, res){
        let callbackCount = 0;
        let context = {};
        search(res, mysql, context, req.query.name, complete); 
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('/', context);
            }

        }
    });

    

    /********************************
    *** Main GET request for page ***
    ********************************/

    router.get('/', function(req, res){
        let callbackCount = 0;
        let context = {};
        // context.jsscripts = ["spa.js"];
        context.jsscripts = ["deletedevice.js"];
        getDevices(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('devices', context);
            }

        }
    });

    /* Update Device */
    router.get('/:device_id', (req, res) => {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatedevice.js"];
        var mysql = req.app.get('mysql');
        getDevice(res, mysql, context, req.params.device_id, done);
        function done() {
            callbackCount++;
            if (callbackCount >= 1)
            {
                res.render('updateDevice', context);
            }
        }
    });

    router.put('/:device_id', (req, res) => {
        console.log("Edit button pressed!");
        // console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql_query = `UPDATE devices SET name = ?, manufacturer = ?, deviceOnOff = ?, currentEnergyUsage = ? WHERE id = ?;`;
        var inserts = [req.body.name, req.body.manufacturer, req.body.deviceOnOff, req.body.currentEnergyUsage, req.params.device_id];

        sql = mysql.pool.query(sql_query, inserts, (err, results, fields) => {
        if(err) {
            res.send(500);
        } else {
            res.status(200);
            res.end();
            console.log("Updated Device");
        }
        });
    });


    /*************
    *** Delete ***
    *************/
    /*

     //delete
    router.delete('/:id', function(req, res) {
        let sql = "SET FOREIGN_KEY_CHECKS=0;delete from ski_areas where id=?; delete from elevation where id=?; delete from terrain where id=?; delete from forecast where id=?; ORDER BY nleft;SET FOREIGN_KEY_CHECKS=1;";
        let inserts = [req.params.id,req.params.id, req.params.id, req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if (error) {
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            } else {
                res.status(202).end();
            }
        });
    });
    */

    router.delete('/:device_id', (req, res) => {
        console.log("Delete button pressed!");

        var mysql = req.app.get('mysql');
        var sql_query = "DELETE Device FROM devices Device WHERE Device.id = ?";
        var inserts = req.params.device_id;

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