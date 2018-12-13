// financeController.js
// Import finance model
Finance = require('../models/finance.model');

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.finance_update = function (req, res) {
    Finance.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

// Handle index actions
exports.index = function (req, res) {
    Finance.get(function (err, financeRecord) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Finance records retrieved successfully",
            data: financeRecord
        });
    });
};

// Handle create finance actions
exports.new = function (req, res) {
    var financeRecord = new Finance();
    financeRecord.Utilities = req.body.Utilities ? req.body.Utilities : financeRecord.Utilities;
    financeRecord.Groceries = req.body.Groceries;
    financeRecord.Transportation = req.body.Transportation;
    financeRecord.Entertainment = req.body.Entertainment;
    financeRecord.Dining = req.body.Dining;
    financeRecord.Rent = req.body.Rent;
// save the contact and check for errors
    financeRecord.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New finance record created!',
            data: financeRecord
        });
    });
};

// Handle view contact info
exports.view = function (req, res) {
    Finance.findById(req.params.contact_id, function (err, financeRecord) {
        if (err)
            res.send(err);
        res.json({
            message: 'Finance records loading..',
            data: financeRecord
        });
    });
};
