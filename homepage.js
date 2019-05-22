module.exports = function() {
    let express = require('express');
    let router = express.Router();
    let mysql = require('./dbcon.js');


    /***************************************
    *** Get all for displaying in tables ***
    ***************************************/

    //select all from devices table
    function getDevices(res, mysql, context, complete){
        console.log("int getDevices");
        mysql.pool.query("SELECT * FROM devices", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.devices = results;
            complete();
        });
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

    //ski page from search
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


    //home page
    router.get('/', function(req, res){
        let callbackCount = 0;
        let context = {};
        //context.jsscripts = ["spa.js"];
        getDevices(res, mysql, context, complete);
        console.log("in router get");

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('/', context);
            }

        }
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

    return router;
}();