const mongoose = require('mongoose');
const  uniqueValidator = require('mongoose-unique-validator');

const userModel = mongoose.Schema({
    firstName: {String, required:true},
    lastname: {String, required:true},
    email: {String, required:true, unique:true  },
    password: {String, required:true},
})
//npm install mongoose-unique-validator

userModel.plugin(uniqueValidator);

module.exports = mongoose.model('User', userModel);
