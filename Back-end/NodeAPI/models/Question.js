const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const questionSchema = new Schema({
question: {
  type: String,
 },
 category: {
  type: String,
 },
answer: {
  type: String,
 },
 choices: {
  type: [String],
 }
});
const Question = mongoose.model("Question", questionSchema);
module.exports = Question;