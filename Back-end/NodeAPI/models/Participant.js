const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participantSchema = new Schema({ 
    name: 'String', 
    score: 'Number',
    correctAnswers: 'Number',
    incorrectAnswers: 'Number',
    averageAnswerTime: 'Number'
});

const Participant = mongoose.model("Participant", participantSchema);

module.exports = Participant;