const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    username : {type: String, unique: true},
    password : String,
    avatar : String,
    city : String,
})

const User = mongoose.model('users',userSchema);
module.exports = User;