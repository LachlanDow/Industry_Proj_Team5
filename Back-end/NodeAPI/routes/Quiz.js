const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const Participant = require("../models/Participant");
const SSE = require('../ServerSentEvents');

// Get All quizzes from db
router.get("/", async (req, res) => {
    try {
      const quiz = await Quiz.find()
      res.json(quiz)
    } catch (err) {
      res.status(500).json({message: err.message})
    }
  });

//Create new quiz
  router.post("/", async (req, res) => {
    const participant = new Participant ({
      name: req.body.name,
      score: 0
    });
    const quizToCreate = new Quiz({
      participants: [ participant ]
    });
    try {
      const newQuiz = await quizToCreate.save();
      res.status(201).json({ newQuiz });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  
  // Get quiz by ID
  router.get("/:id", getQuiz, (req, res) => {
    res.json(res.quiz);
  });

  //Join Quiz
router.patch("/:id", getQuiz, async (req, res) => {
  if (req.body.name != null) {
    const participant = new Participant ({
      name: req.body.name,
      score: 0
    });
    res.quiz.participants.push(participant);
  }
  try {
    const updatedQuiz = await res.quiz.save();
    res.json(updatedQuiz);
    SSE.data.sendEventsToAll("Participant joined", updatedQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 

//getQuiz middleware - this allows multiple functions above which do the same thing (get quiz by id) to reuse the same code
async function getQuiz(req, res, next) {
  let quiz;
  try {
    quiz = await Quiz.findById(req.params.id);
    if (quiz == null) {
      return res.status(404).json({ message: "Cannot find Quiz" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.quiz = quiz;
  next();
}

  module.exports = router;