const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//const Schema = mongoose.Schema

const SALT_ROUNDS = 6;


const movieUsers = mongoose.Schema({
    name: { type: String,  required: true},
    email: { type: String, required: true, lowercase: true, unique: true},
    password: {type: String, required: true}
}, {timestamp: true})



// movieUsers.set('toJSON', {
//     transform: function(doc, ret) {
//       // remove the password property when serializing doc to JSON
//       delete ret.password;
//       return ret;
//     }
//   });

movieUsers.methods.checkPassword = function(passwordAttempt, callback) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
      if (err) return callback(err);
      callback(null, isMatch);
  });
};

movieUsers.pre('save', function(next) {
    // 'this' will be set to the current document
    const user = this;
    if (!user.isModified('password')) return next();
    // password has been changed - salt and hash it
    bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
      if (err) return next(err);
      // replace the user provided password with the hash
      user.password = hash;
      next();
    });
  });



  movieUsers.methods.withoutPassword = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};


module.exports = mongoose.model('User', movieUsers);
