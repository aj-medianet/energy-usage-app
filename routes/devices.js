module.exports = function() {
    let express = require('express');
    let router = express.Router();
    let mysql = require('../dbcon.js');
    const deviceController = require('../controllers/deviceController')

    /************************************
    *** Main requests for Device Page ***
    *************************************/

    /* device page from search */
    router.get('/search', deviceController.getSearchResult);

    /* get all device information */
    router.get('/', deviceController.getAllDevices);

    /* Get the information of selected Device */
    router.get('/:device_id', deviceController.getSingleDevice);

    /* Update Device */
    router.put('/:device_id', deviceController.updateSingleDevice);
    
    // /* Delete Device */
    // router.delete('/:device_id', (req, res) => deviceController.deleteSingleDevice);
    
    return router;
}();
