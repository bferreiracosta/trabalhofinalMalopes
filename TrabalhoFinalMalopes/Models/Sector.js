// Constants
const mongoose = require('mongoose');
const _ = require('lodash');

// Variables
var Schema = mongoose.Schema;


// Sector Schema 
var SectorSchema = new Schema({
    _idUser: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    _idResponsible: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

var Sector = mongoose.model('Sector', SectorSchema);

module.exports = {Sector};