let mongoose = require('mongoose');

/**user schema*/
let userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true
    }
});

let User = module.exports = mongoose.model('User', userSchema)

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}
