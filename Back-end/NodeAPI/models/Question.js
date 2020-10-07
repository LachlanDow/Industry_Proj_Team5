const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Get All Route
router.get("/", async (req, res) => {
    try {
      const question = await Question.find()
      res.json(question)
    } catch (err) {
      res.status(500).json({message: err.message})
    }
  });

// Get One Route
router.get("/:id", async (req, res) => {
// Rest of the code will go here
}); 

// Create One Route
router.post("/", async (req, res) => {
    const question = new Question({
      questionText: req.body.questionText,
      answer: req.body.answer
    });
    try {
      const newQuestion = await question.save();
      res.status(201).json({ newQuestion });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
// Edit One Route PUT version
router.put("/:id", async (req, res) => {
// Rest of the code will go here
});
// Edit One Route PATCH version
router.patch("/:id", async (req, res) => {
// Rest of the code will go here
});
// Delete One Route
router.delete("/:id", async (req, res) => {
// Rest of the code will go here
});

module.exports = router;