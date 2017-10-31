var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var proxySchema = new Schema({
    ip: {
        type: String,
        required: true,
        unique: true
    },
    port: {
        type: Number,
        required: true
    },
    dateAdded: Date,
    country: String,
    anonymity: String,
    working: Boolean,
    lastChecked: Date,
    source: String
});

module.exports = mongoose.model('Proxy', proxySchema);;