const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("./Category");
const questionSchema = new Schema({
    question: {
        type: String,
    },
    category: {
        type: Category.schema,
        required: true
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