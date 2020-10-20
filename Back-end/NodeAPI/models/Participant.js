const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participantSchema = new Schema({ 
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
    
});

const Participant = mongoose.model("Participant", participantSchema);

module.exports = Participant;