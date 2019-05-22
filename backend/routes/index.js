var express = require('express');
var router = express.Router();

/* GET home page. return devices */
router.get('/', function(req, res, next) {
 	res.locals.connection.query('SELECT * FROM devices', function (error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
});

module.exports = router;
