const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create a schema
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
},{collection : 'clinician'});

//create a model by schema
const Clinician = mongoose.model('Clinician',userSchema);

//export the model
module.exports = Clinician;