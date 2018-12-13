let router = require('express').Router();
const finance_controller = require('../controllers/finance.controller');

// Set default API response
router.get('/', function (req, res) {
    res.json({
       status: 'API Its Working',
       message: 'Welcome to RESTHub crafted with love!',
    });
});

// GET Routes
router.get('/test', finance_controller.test);

// Export API routes
module.exports = router;