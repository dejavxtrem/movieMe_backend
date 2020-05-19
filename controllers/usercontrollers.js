const mongoose = require('mongoose');
const movieUsers = mongoose.Schema({
    name: { type: String,  required: true},
    email: { type: String, required: true, lowercase: true, unique: true},
    password: String
},{timestamp: true})


module.exports = mongoose.model('movieuserdata', movieUsers);




