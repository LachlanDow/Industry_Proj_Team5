const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("./Category");
const random = require('mongoose-simple-random');

//Schema for question documents in DB. Question documents have an automatically provided ID,
//the question itself, a category object, an answer, and a list of choices
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
questionSchema.plugin(random);
//Model must be exported to be used in routing to manipulate DB.
const Question = mongoose.model("Question", questionSchema);
module.exports = Question;