const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Participant = require("./Participant");
const Category = require("./Category");
const Question = require("./Question");

const quizSchema = new Schema({
    _id: String,
    participants: { type: [Participant.schema], validate: v => Array.isArray(v) && v.length > 0 },
    categoryId: { type: String, required: true },
    timeLimit: { type: Number, required: true },
    questionCount: { type: Number, required: true },
    questions: { type: [Question.schema], validate: v => Array.isArray(v) && v.length > 0 },
    questionNumber: { type: Number, required: true }
});
const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
