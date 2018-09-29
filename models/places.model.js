var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PlacesSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    location: {
        "type": { type: String },
        "coordinates" :[]
    },
    emotion: {
        type: String,
        required: false
    }

});

module.exports = Places = mongoose.model('places', PlacesSchema);
