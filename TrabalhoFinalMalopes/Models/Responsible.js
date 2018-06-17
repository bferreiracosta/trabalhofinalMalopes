
// Constants
const mongoose = require('mongoose');
const _ = require('lodash');

// Variables
var Schema = mongoose.Schema;


// Responsible Schema 
var ResponsibleSchema = new Schema({
    _idUser: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cpf: {
        type: String
    },
    phone: {
        type: Number
    }
});

var Responsible = mongoose.model('Responsible', ResponsibleSchema);

module.exports = {Responsible};
