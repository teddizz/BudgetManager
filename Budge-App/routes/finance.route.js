let router = require('express').Router();
const finance_controller = require('../controllers/finance.controller');

var value;

// Set default API response
router.get('/', function (req, res) {
    var db = req.db;
    console.log("Connected successfully to server");
    var query = {Utilities:33}
    db.collection("spendingData").find({}, query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        db.close();
    });
});

// GET Routes
router.get('/test', finance_controller.test);
router.put('/:id/update', finance_controller.finance_update);

// Export API routes
module.exports = router;