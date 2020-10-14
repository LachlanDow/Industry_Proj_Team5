const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const CryptPin = require("../generateID");
const Participant = require("../models/Participant");
const Category = require("../models/Category");
const Question = require("../models/Question");
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

//Create new quiz. This adds the host as a participant, selects the category, timelimit, question count
//and selects questions. TODO - move question selection to another function and provide functionality to pick random questions
//from different categories
router.post("/", async (req, res) => {
    const participant = new Participant({
        name: req.body.hostName,
        score: 0
    });

    const questionList = await Question.find({category: req.body.categoryId}).limit(req.body.questionCount);
    const category = await Category.findById(req.body.categoryId);
      const quizToCreate = new Quiz({
          _id: CryptPin(),
      participants: [ participant ],
          category: new Category({
              name: category,
              _id: req.body.categoryId
          }),
      timeLimit: req.body.timeLimit,
      questionCount: req.body.questionCount,
      questions: questionList,
      questionNumber: 0
    });
    try {
      const newQuiz = await quizToCreate.save();
      res.status(201).json({ newQuiz });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  
  // Get quiz by ID - this is the equivalent of get quiz state
  router.get("/:id", getQuiz, (req, res) => {
    res.json(res.quiz);
  });

  // Start quiz
  router.post("/:id/start", getQuiz, async (req, res) => {
    SSE.data.gameLoopStart(res.quiz);
    try {
      const updatedQuiz = await res.quiz.save();
      res.json(updatedQuiz);
      SSE.data.sendEventsToAllInQuiz(res.quiz.participants, updatedQuiz);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //Join Quiz. Patch to quiz endpoint with quizID after slash. This notifies all other participants in quiz.
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
    SSE.data.sendEventsToAllInQuiz(res.quiz.participants, updatedQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

  //Update participant score
  router.patch("/:id/:participantId", getQuiz, async (req, res) => {
    //Find the participant in the quiz by their participant ID, and change to the score send in request body
    res.quiz.participants.find(p => p.id == req.params.participantId).score = req.body.score;
    try {
      const updatedQuiz = await res.quiz.save();
      res.json(updatedQuiz);
      SSE.data.sendEventsToAllInQuiz(res.quiz.participants, updatedQuiz);
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