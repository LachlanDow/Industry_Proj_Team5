const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const Category = require("../models/Category");
// Get All questions when get made to /questions endpoint
router.get("/", async (req, res) => {
    try {
      const question = await Question.find()
      res.json(question)
    } catch (err) {
      res.status(500).json({message: err.message})
    }
  });

// Create question when post made to /questions endpoint
router.post("/", async (req, res) => {
    const question = new Question({
      questionText: req.body.questionText,
        answer: req.body.answer,
        category: new Category({
            name: req.body.category,
            _id: req.body.categoryId
        }),
        choices:req.body.choices
    });
    try {
      const newQuestion = await question.save();
      res.status(201).json({ newQuestion });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = router;