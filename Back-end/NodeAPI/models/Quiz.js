const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Participant = require("../models/Participant");
const Category = require("./Category");

const quizSchema = new Schema({
  participants: [Participant.schema],
  category: Category.schema,
  timeLimit: Number,
  questionCount: Number

});
const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
