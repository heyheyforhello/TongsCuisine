const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create a schemadb
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    uuid: { type: String, required:true},
    attack: [{time : Date, location : String}]
},{ collection : 'patient'});

//Create a model by schema
const Patient = mongoose.model('Patient',userSchema);

//Export the model
module.exports = Patient;