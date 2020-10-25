const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Powerup = require("./Powerup");

//Schema for participant documents in DB. Participant documents have a name, a score, a number of how many correct answers
// and incorrect answers they have had, their average time taken to answer, and a list of powerups
const participantSchema = new Schema({ 
    name: 'String', 
    score: 'Number',
    correctAnswers: 'Number',
    incorrectAnswers: 'Number',
    averageAnswerTime: 'Number',
    powerups: { type: [Powerup.schema] , validate: v => Array.isArray(v) && v.length > 0 }

});

//Model must be exported to be used in routing to manipulate DB.
const Participant = mongoose.model("Participant", participantSchema);
module.exports = Participant;