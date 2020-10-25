const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const CryptPin = require("../generateID");
const Participant = require("../models/Participant");
const Category = require("../models/Category");
const Question = require("../models/Question");
const Leaderboard = require("../models/Leaderboard");
const Powerup = require("../models/Powerup");

const SSE = require('../ServerSentEvents');
const fetch = require('node-fetch');
const powerupRouter = require("./Powerup.js");
// Get All quizzes from db when get made to /quiz endpoint
router.get("/", async (req, res) => {
  try {
    const quiz = await Quiz.find()
    res.json(quiz)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

//Create new quiz when post made to /quiz endpoint. This adds the host as a participant, selects the category, timelimit, question count
//and selects questions. 
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
  //Call made to powerups endpoint to set all powerups for participant
  var response = await fetch('http://127.0.0.1:3000/powerups');
  json = await response.json();

  //New participant is created for the host who is creating the quiz
  const participant = new Participant({
    name: req.body.hostName,
    score: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    averageAnswerTime: 0,
    powerups: json
  });
  //All questions of category found from DB
  var categoryquestion = await Question.find({ "category._id": String(req.body.categoryId) });
  //List of questions is 'shuffled' into new random order
  shuffleArray(categoryquestion);

  //Question list is then set to be a subset of this list, depending on the desired number of questions given in questionCount
  var questionList = categoryquestion.slice(0, req.body.questionCount);

  const quizToCreate = new Quiz({
    //Quiz ID is set using CryptPin function which gives a shorter and more user readable/memorable code for sharing with others to join
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


// Get quiz by ID on get to /quiz/(quizID) - this is the equivalent of get quiz state
router.get("/:id", getQuiz, (req, res) => {
  res.json(res.quiz);
});

// Start quiz when post made to /quiz/(quizID)/start
router.post("/:id/start", getQuiz, async (req, res) => {
  //Starts game loop in SSE function so that updates are sent to all quiz players
  SSE.data.gameLoopStart(res.quiz);
  try {
    const updatedQuiz = await res.quiz.save();
    res.json(updatedQuiz);
    SSE.data.sendEventsToAllInQuiz(res.quiz.participants, updatedQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Join Quiz when patch made to /quiz/(quizID) This notifies all other participants in quiz.
router.patch("/:id", getQuiz, async (req, res) => {
  //Call made to powerups endpoint to set all powerups for participant
  var response = await fetch('http://127.0.0.1:3000/powerups');
  json = await response.json();

  var participant;
  if (req.body.name != null) {
    participant = new Participant({
      name: req.body.name,
      score: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      averageAnswerTime: 0,
      powerups: json
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

//Update participant score when patch made to /quiz/(quizID)/(participantID)
router.patch("/:id/:participantId", getQuiz, async (req, res) => {
  const participant = res.quiz.participants.find(p => p.id == req.params.participantId);
  if (participant != null) {
    //If parameter provided, set corresponding property of participant
    if (req.body.score != null) {
      var roundscore = req.body.score;
      //implement handicap
      if (participant.powerups[1].active == false) {
        //If the player does not have the handicap powerup currently active, check if another player has it active. If so, double score.
        for (var part = 0; part < res.quiz.participants.length; ++part) {
          if (res.quiz.participants[part].powerups[1].active == true) {
            roundscore = (roundscore * 2)
            break;

          }
        }
      }
      //Set score to score + the score for the round
      participant.score = participant.score + roundscore;
    }
    //Optionally request can update correctAnswers, incorrectAnswers, averageAnswerTime
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
      res.quiz.participants = res.quiz.participants.sort(compare);
      const updatedQuiz = await res.quiz.save();
      res.json(updatedQuiz);
      SSE.data.sendEventsToAllInQuiz(res.quiz.participants, updatedQuiz);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

});
//Function used when sorting list by order of participant score
var compare = function (a, b) {
  return parseInt(a.score) - parseInt(b.score);
}


//activate participant powerup when patch made to /quiz/(quizID)/(participantID)/powerup
router.patch("/:id/:participantId/powerup", getQuiz, async (req, res) => {
  //Find the participant in the quiz by their participant ID, and change to the powerup send in request body
  var part = res.quiz.participants.find(p => p.id == req.params.participantId)
  if (part != null) {
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
  }

});



//deactivate participant powerup when patch made to /quiz/(quizID)/(participantID)/removepowerup
router.patch("/:id/:participantId/removepowerup", getQuiz, async (req, res) => {
  //Find the participant in the quiz by their participant ID, and change to the powerup send in request body
  var part = res.quiz.participants.find(p => p.id == req.params.participantId)
  if (part != null) {
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
  }

});


//make participant powerup available when patch made to /quiz/(quizID)/(participantID)/availablepowerup
router.patch("/:id/:participantId/availablepowerup", getQuiz, async (req, res) => {
  var part = res.quiz.participants.find(p => p.id == req.params.participantId)
  if (part != null) {
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
  }
  //Find the participant in the quiz by their participant ID, and change to the powerup send in request body


});

//make participant powerup unavailable when patch made to /quiz/(quizID)/(participantID)/unavailablepowerup
router.patch("/:id/:participantId/unavailablepowerup", getQuiz, async (req, res) => {
  //Find the participant in the quiz by their participant ID, and change to the powerup send in request body
  var part = res.quiz.participants.find(p => p.id == req.params.participantId)
  if (part != null) {
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

//Function to shuffle array to randomise questions to be set for quiz
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

module.exports = router;