// Constants
const mongoose = require('mongoose');
const _ = require('lodash');

// Variables
var Schema = mongoose.Schema;


// Category Schema 
var CategorySchema = new Schema({
    _idUser: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    _idSector: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

var Category = mongoose.model('Category', CategorySchema);

module.exports = {Category};

