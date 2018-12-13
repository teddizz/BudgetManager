const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let financeSchema = new Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
});

// Export finance model
module.exports = mongoose.model('financeRecord', financeSchema);
