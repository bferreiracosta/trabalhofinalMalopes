
// Constants
const mongoose = require('mongoose');
const _ = require('lodash');

// Variables
var Schema = mongoose.Schema;


// Product Schema 
var ProductSchema = new Schema({
    _idUser: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    _idCategory: {
        type: Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

var Product = mongoose.model('Product', ProductSchema);

module.exports = {Product};
