const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participantSchema = new Schema({ 
    name: 'String', 
    score: 'Number'
});

const Participant = mongoose.model("Participant", participantSchema);

module.exports = Participant;