const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const powerupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }

});

const Powerup = mongoose.model("Powerup", powerupSchema);

module.exports = Powerup;