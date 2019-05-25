module.exports = function() {
    let express = require('express');
    let router = express.Router();
    let mysql = require('./dbcon.js');


    /***************************************
    *** Get all for displaying in tables ***
    ***************************************/

    //gets all ski areas
    function getSkiAreas(res, mysql, context, complete){
        mysql.pool.query("SELECT ski_areas.id, ski_areas.name, states.stateCode as state, avgSnowfall, yearsOpen FROM ski_areas INNER JOIN states ON state = states.id order by name", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.ski_areas = results;
            complete();
        });
    }

    //get all elevations for displaying in table - show ski area name with inner join instead of skiAreaName as an integer
    function getElevation(res, mysql, context, complete){
        //console.log('in getElevation');
        mysql.pool.query("select elevation.id, ski_areas.name as skiAreaName, topElevation, baseElevation, verticalRelief from elevation inner join ski_areas on ski_areas.id = elevation.id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.elevation = results;
            complete();
        });
    }

    //get all elevations for displaying in table - show ski area name with inner join instead of skiAreaName as an integer
    function getTerrain(res, mysql, context, complete){
        //console.log('in getTerrain');
        mysql.pool.query("select terrain.id, ski_areas.name as skiAreaName, beginner, intermediate, advanced, expert from terrain inner join ski_areas on ski_areas.id = terrain.id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.terrain = results;
            complete();
        });
    }

    /*************
    *** Search ***
    *************/

    //get 1 ski area from search 
    function getSearchSkiArea(res, mysql, context, name, complete){
        let sql = "SELECT ski_areas.id, ski_areas.name, states.stateCode as state, avgSnowfall, yearsOpen FROM ski_areas INNER JOIN states ON state = states.id WHERE ski_areas.name = ?";
        let inserts = [name];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.ski_areas = results;
            complete();
        });
    }

    //get 1 ski area from search 
    function getSearchElevation(res, mysql, context, name, complete){
        let sql = "select elevation.id, ski_areas.name as skiAreaName, topElevation, baseElevation, verticalRelief from elevation inner join ski_areas on ski_areas.id = elevation.id where ski_areas.name = ?";
        let inserts = [name];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.elevation = results;
            complete();
        });
    }

    //get 1 ski area from search 
    function getSearchTerrain(res, mysql, context, name, complete){
        let sql = "select terrain.id, ski_areas.name as skiAreaName, beginner, intermediate, advanced, expert from terrain inner join ski_areas on ski_areas.id = terrain.id where ski_areas.name = ?";
        let inserts = [name];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.terrain = results;
            complete();
        });
    }

    //ski areas page from search
    router.get('/search', function(req, res){
        let callbackCount = 0;
        let context = {};
        //context.jsscripts = ["spa.js"];
        getSearchSkiArea(res, mysql, context, req.query.name, complete); 
        getSearchElevation(res, mysql, context, req.query.name, complete); 
        getSearchTerrain(res, mysql, context, req.query.name, complete); 
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('ski-areas', context);
            }

        }
    });

    /***************
    *** Updating *** 
    ***************/

    //gets 1 ski area for updating
    function getSkiArea(res, mysql, context, id, complete){
        let sql = "SELECT id, name, state, avgSnowfall, yearsOpen FROM ski_areas WHERE id = ?";
        let inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.ski_areas = results[0];
            complete();
        });
    }

     //get one elevation using id for update page
    function getOneElevation(res, mysql, context, id, complete){
        let sql = "SELECT id, skiAreaName, topElevation, baseElevation, verticalRelief FROM elevation WHERE id = ?";
        let inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.elevation = results[0];
            complete();
        });
    }

    //get one elevation using id for update page
    function getOneTerrain(res, mysql, context, id, complete){
        //console.log('in getOneTerrain');
        let sql = "SELECT id, skiAreaName, beginner, intermediate, advanced, expert FROM terrain WHERE id = ?";
        let inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.terrain = results[0];
            complete();
        });
    }

    //get one forecast using id for update page
    function getOneForecast(res, mysql, context, id, complete){
        //console.log('in getOneTerrain');
        let sql = "SELECT id, skiAreaName, lat, lon FROM forecast WHERE id = ?";
        let inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.forecast = results[0];
            complete();
        });
    }


    /*********************
    *** Display States ***
    *********************/

    //get all states for displaying in drop downs
    function getStates(res, mysql, context, complete){
        mysql.pool.query("SELECT id, stateCode, name FROM states", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.states = results;
            complete();
        });
    }

    

    /********************************
    *** Main GET request for page ***
    ********************************/


    //ski areas page
    router.get('/', function(req, res){
        let callbackCount = 0;
        let context = {};
        context.jsscripts = ["spa.js"];
        getSkiAreas(res, mysql, context, complete);
        getStates(res, mysql, context, complete);
        getElevation(res, mysql, context, complete);
        getTerrain(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 4){
                res.render('ski-areas', context);
            }

        }
    });

    /*********************************
    *** Main POST request for page ***
    *********************************/ 

    //adds a ski area to ski areas page
    router.post('/', function(req, res) {
        let sql = "insert into ski_areas (name, state, avgSnowfall, yearsOpen) values (?,?,?,?); insert into elevation (skiAreaName,topElevation, baseElevation, verticalRelief) values ((SELECT MAX(id) FROM ski_areas),?,?,?); insert into terrain (skiAreaName,beginner, intermediate, advanced, expert) values ((SELECT MAX(id) FROM ski_areas),?,?,?,?); insert into forecast (skiAreaName,lat,lon) values ((SELECT MAX(id) FROM ski_areas),?,?)";
        let inserts = [req.body.name, req.body.state, req.body.avgSnowfall, req.body.yearsOpen, req.body.topElevation, req.body.baseElevation, req.body.verticalRelief, req.body.beginner, req.body.intermediate, req.body.advanced, req.body.expert, req.body.lat, req.body.lon];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end()
            } else {
                res.redirect('/ski-areas');
            }
        })
    });

    /***************
    *** Updating ***
    ***************/
    
    /* Display one ski area for updating */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        let context = {};
        context.jsscripts = ["spa.js"];
        getSkiArea(res, mysql, context, req.params.id, complete);
        getOneElevation(res, mysql, context,req.params.id, complete);
        getOneTerrain(res, mysql, context,req.params.id, complete);
        getOneForecast(res, mysql, context,req.params.id, complete); //lat & lon
        getStates(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 5){
                res.render('update-ski-area', context);
            }

        }
    });

    //update ski area data 
    router.put('/:id', function(req, res){
        //console.log('in router.put');
        let sql = "UPDATE ski_areas SET name=?, state=?, avgSnowfall=?, yearsOpen=? WHERE id=?; UPDATE elevation SET topElevation=?, baseElevation=?, verticalRelief=? WHERE id=?; UPDATE terrain SET beginner=?, intermediate=?,advanced=?,expert=? WHERE id=?; UPDATE forecast SET lat=?,lon=? WHERE id=?";
        let inserts = [req.body.name, req.body.state, req.body.avgSnowfall, req.body.yearsOpen,req.params.id, req.body.topElevation, req.body.baseElevation, req.body.verticalRelief, req.params.id, req.body.beginner, req.body.intermediate, req.body.advanced, req.body.expert, req.params.id,req.body.lat, req.body.lon, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                //console.log('update put error: ' + JSON.stringify(error));
                res.write(JSON.stringify(error));
                console.log(JSON.stringify(error));
                res.end();
            }else{
                //console.log('no errors');
                res.status(200);
                res.end();
            }
        });
    });

    /*************
    *** Delete ***
    *************/

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

    return router;
}();