const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Participant = require("./Participant");
const Category = require("./Category");
const Question = require("./Question");

//Schema for question documents in DB. Question documents have an ID, a list of participants, a category ID,
//The timelimit in seconds between each question, the total number of questions (questionCount), 
//a list of questions, and the current question number
const quizSchema = new Schema({
    _id: String,
    participants: { type: [Participant.schema], validate: v => Array.isArray(v) && v.length > 0 },
    categoryId: { type: String, required: true },
    timeLimit: { type: Number, required: true },
    questionCount: { type: Number, required: true },
    questions: { type: [Question.schema], validate: v => Array.isArray(v) && v.length > 0 },
    questionNumber: { type: Number, required: true }
});

//Model must be exported to be used in routing to manipulate DB.
const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
