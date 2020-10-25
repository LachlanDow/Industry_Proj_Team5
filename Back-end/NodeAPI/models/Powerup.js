const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema for powerup documents in DB. Powerup documents have an automatically provided ID, a name, a boolean denoting whether the powerup is available or not
//and a boolean denoting whether or not the powerup is currently active.
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

//Model must be exported to be used in routing to manipulate DB.
const Powerup = mongoose.model("Powerup", powerupSchema);
module.exports = Powerup;