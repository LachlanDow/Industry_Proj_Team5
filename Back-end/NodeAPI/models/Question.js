const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("./Category");
const questionSchema = new Schema({
    question: {
        type: String,
        required:true
    },
    category: {
        type: Category.schema,
        required: true
    },
 
answer: {
    type: String,
    required:true
 },
 choices: {
     type: [String],
     validate: v => Array.isArray(v) && v.length > 0,
 }
});
const Question = mongoose.model("Question", questionSchema);
module.exports = Question;