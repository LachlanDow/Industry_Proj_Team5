const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const CryptPin  = require("../generateID");
const Participant = require("../models/Participant");
const Category = require("../models/Category");
const Question = require("../models/Question");
const Powerup = require("../models/Powerup");
const SSE = require('../ServerSentEvents');
const fetch = require('node-fetch');
const powerupRouter = require("./Powerup.js");
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
    var response = await fetch('http://127.0.0.1:3000/powerups');
    json = await response.json();
    
    
    const participant = new Participant({
        name: req.body.hostName,
        score: 0,
        powerups: json

       
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
  var response = await fetch('http://127.0.0.1:3000/powerups');
  json = await response.json();

  var participant;
  if (req.body.name != null) {
    participant = new Participant ({
      name: req.body.name,
      score: 0,
      powerups: json
    });
    res.quiz.participants.push(participant);
  }
  try {
    const updatedQuiz = await res.quiz.save();
    res.json(participant);
    SSE.data.sendEventsToAllInQuiz(res.quiz.participants, updatedQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

  //Update participant score
  router.patch("/:id/:participantId", getQuiz, async (req, res) => {
    //Find the participant in the quiz by their participant ID, and change to the score send in request body
      var roundscore = req.body.score;
      //implement handicap
      if (res.quiz.participants.find(p => p.id == req.params.participantId).powerups[1].active == false) {
         
              for (var part = 0; part < res.quiz.participants.length; ++part) {
                  if (res.quiz.participants[part].powerups[1].active == true) {
                      roundscore = (roundscore * 2)
                      break;

                  }
              }
          
      }


      res.quiz.participants.find(p => p.id == req.params.participantId).score = res.quiz.participants.find(p => p.id == req.params.participantId).score + roundscore;
    try {
      const updatedQuiz = await res.quiz.save();
      res.json(updatedQuiz);
      SSE.data.sendEventsToAllInQuiz(res.quiz.participants, updatedQuiz);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

//activate participant powerup
router.patch("/:id/:participantId/powerup", getQuiz, async (req, res) => {
    //Find the participant in the quiz by their participant ID, and change to the powerup send in request body
    var part = res.quiz.participants.find(p => p.id == req.params.participantId)
    part.powerups.forEach(powerup => {
        if (powerup.name == req.body.powerupName) {
            powerup.active = true;
        }

    });

    try {
        const updatedQuiz = await res.quiz.save();
        res.json(updatedQuiz);
        SSE.data.sendEventsToAllInQuiz(res.quiz.participants, updatedQuiz);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



//deactivate participant powerup
router.patch("/:id/:participantId/removepowerup", getQuiz, async (req, res) => {
    //Find the participant in the quiz by their participant ID, and change to the powerup send in request body
    var part = res.quiz.participants.find(p => p.id == req.params.participantId)
    part.powerups.forEach(powerup => {
        if (powerup.name == req.body.powerupName) {
            powerup.active = false;
        }

    });

    try {
        const updatedQuiz = await res.quiz.save();
        res.json(updatedQuiz);
        SSE.data.sendEventsToAllInQuiz(res.quiz.participants, updatedQuiz);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//make participant powerup available
router.patch("/:id/:participantId/availablepowerup", getQuiz, async (req, res) => {
    //Find the participant in the quiz by their participant ID, and change to the powerup send in request body
    var part = res.quiz.participants.find(p => p.id == req.params.participantId)
    part.powerups.forEach(powerup => {
        if (powerup.name == req.body.powerupName) {
            powerup.available = true;
        }

    });

    try {
        const updatedQuiz = await res.quiz.save();
        res.json(updatedQuiz);
        SSE.data.sendEventsToAllInQuiz(res.quiz.participants, updatedQuiz);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//make participant powerup unavailable
router.patch("/:id/:participantId/unavailablepowerup", getQuiz, async (req, res) => {
    //Find the participant in the quiz by their participant ID, and change to the powerup send in request body
    var part = res.quiz.participants.find(p => p.id == req.params.participantId)
    part.powerups.forEach(powerup => {
        if (powerup.name == req.body.powerupName) {
            powerup.available = false;
        }

    });

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