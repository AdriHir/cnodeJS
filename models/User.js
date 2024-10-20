const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    firstName: {String, required:true},
    lastname: {String, required:true},
    email: {String, required:true, unique:true  },
    password: {String, required:true},
})

module.exports = mongoose.models('User', userModel);
