const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Participant = require("../models/Participant");

const quizSchema = new Schema({
  participants: [Participant.schema]
});
const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
