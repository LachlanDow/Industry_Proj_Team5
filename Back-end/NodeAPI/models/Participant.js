const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Powerup = require("./Powerup");

const participantSchema = new Schema({ 
    name: 'String', 
    score: 'Number',
    correctAnswers: 'Number',
    incorrectAnswers: 'Number',
    averageAnswerTime: 'Number'
    powerups: { type: [Powerup.schema] , validate: v => Array.isArray(v) && v.length > 0 }

});

const Participant = mongoose.model("Participant", participantSchema);

module.exports = Participant;