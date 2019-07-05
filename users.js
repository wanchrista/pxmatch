// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        username     : String,
        email        : String,
        password     : String,
    }

});

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return (password === this.local.password); 
};

// create the model for users and generalize it to our app
module.exports = mongoose.model('User', userSchema);
