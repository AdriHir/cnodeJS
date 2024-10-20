const mongoose = require('mongoose');

const thisUser = mongoose.Schema({
    firstName: String,
    lastname: String,
    email: String,
    password: String,
})

module.exports = mongoose.models('User', thisUser);

