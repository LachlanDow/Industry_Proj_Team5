const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const CryptPin = require("../generateID");
const Participant = require("../models/Participant");
const Category = require("../models/Category");
const Question = require("../models/Question");
const Leaderboard = require("../models/Leaderboard");
const SSE = require('../ServerSentEvents');

// Get All quizzes from db
router.get("/", async (req, res) => {
  try {
    const quiz = await Quiz.find()
    res.json(quiz)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

//Create new quiz. This adds the host as a participant, selects the category, timelimit, question count
//and selects questions. TODO - move question selection to another function and provide functionality to pick random questions
//from different categories
router.post("/", async (req, res) => {
  //If there is no leaderboard with ID 'main', create this leaderboard
  //This strategy makes it easier to extend later on if we wished to have leaderboards for different categories etc
  //Also set a max participant count - how many will be stored in the leaderboard at any given time
  if (await Leaderboard.findById("main") == null) {
    const leaderBoard = new Leaderboard({
      _id: "main",
      participants: [],
      maxParticipantCount: 10
    });
    try {
      await leaderBoard.save()
    }
    catch (err) {
      console.log(err);
    }
  }


  const participant = new Participant({
    name: req.body.hostName,
    score: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    averageAnswerTime: 0
  });
  const questionList = await Question.find({ "category._id": String(req.body.categoryId) }).limit(req.body.questionCount);
  const quizToCreate = new Quiz({
    _id: CryptPin(),
    participants: [participant],
    categoryId: req.body.categoryId,
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
  var participant;
  if (req.body.name != null) {
    participant = new Participant({
      name: req.body.name,
      score: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      averageAnswerTime: 0
    });
    res.quiz.participants.push(participant);
    try {
      const updatedQuiz = await res.quiz.save();
      res.json(participant);
      SSE.data.sendEventsToAllInQuiz(res.quiz.participants, updatedQuiz);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
});

//Update participant score
router.patch("/:id/:participantId", getQuiz, async (req, res) => {
  //Find the participant in the quiz by their participant ID
  const participant = res.quiz.participants.find(p => p.id == req.params.participantId);
  if (participant != null) {
    //If parameter provided, set corresponding property of participant
    if (req.body.score != null) {
      participant.score = req.body.score;
    }
    if (req.body.correctAnswers != null) {
      participant.correctAnswers = req.body.correctAnswers;
    }
    if (req.body.incorrectAnswers != null) {
      participant.incorrectAnswers = req.body.incorrectAnswers;
    }
    if (req.body.averageAnswerTime != null) {
      participant.averageAnswerTime = req.body.averageAnswerTime;
    }
    try {
      const updatedQuiz = await res.quiz.save();
      res.json(updatedQuiz);
      SSE.data.sendEventsToAllInQuiz(res.quiz.participants, updatedQuiz);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
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