const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Participant = require("./Participant");
const Category = require("./Category");
const Question = require("./Question");

const quizSchema = new Schema({
    _id: String,
  participants: [Participant.schema],
    category: Category.schema,
  timeLimit: Number,
  questionCount: Number,
  questions: [Question.schema],
  questionNumber: Number
});
const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
