const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proxySchema = new Schema({
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

module.exports = mongoose.model('Proxy', proxySchema);
