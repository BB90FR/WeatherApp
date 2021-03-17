const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
    city : String,
    img: String,
    weather: String,
    minTemp: Number,
    maxTemp: Number,
    lon: Number,
    lat: Number,
    country: String
   });

const cityModel = mongoose.model('cities', citySchema);

module.exports = cityModel;