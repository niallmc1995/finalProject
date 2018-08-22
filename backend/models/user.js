const mongoose = require('mongoose');

const uniqueValidator = require("mongoose-unique-validator");
//**REFERENCE 
//https://mongoosejs.com/docs/guide.html*/
//specifying the data that will be used for a mongoose schema for mongodb
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true },
});


userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
