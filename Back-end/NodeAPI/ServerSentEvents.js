const Participant = require("./models/Participant");
const Quiz = require("./models/Quiz");
const Leaderboard = require("./models/Leaderboard");

var eventsHandler = async function eventsHandler(req, res) {
    // Mandatory headers and http status to keep connection open. Also header to stop CORS from being disallowed on browser.
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
    };
    res.writeHead(200, headers);
    const quiz = await Quiz.find({ "participants._id": req.params.participantId });
    console.log(quiz);
    //Adds participants res object to associative array
    try {
        participantList[req.params.participantId] = res;
    } catch (e) {
        console.log(e);
    }
    res.write(`data: ${JSON.stringify(quiz[0])}\n\n`);

    //When client closes connection, update the clients list to remove client
    req.on('close', () => {
        console.log(`${req.params.participantId} Connection closed`);
        //Removes entry from associative array if participant leaves
        delete participantList[req.params.participantId];
    });
}

//Sends an object to all the participants in a quiz using a Server Sent Event. 
var sendEventsToAllInQuiz = function sendEventsToAllInQuiz(particpantsInQuiz, eventContent) {
    particpantsInQuiz.forEach(function (participant) {
        try {
            //If the participant is in the associative array (is an actual user and not added by Postman etc during testing)
            if (participantList[participant.id] !== undefined) {
                participantList[participant.id].write(`data: ${JSON.stringify(eventContent)}\n\n`);
            }
        }
        catch (e) {
            console.log(e);
        }
    });
}

var timerHandler;

async function gameLoop(quiz) {
    quiz.questionNumber++;

    if (quiz.questionNumber <= quiz.questionCount) {
        const updatedQuiz = await quiz.save();
        sendEventsToAllInQuiz(quiz.participants, updatedQuiz);
    }
    else {
        clearInterval(timerHandler);
        quiz.questionNumber = -1;
        if(quiz.participants.length > 1) { 
            quiz.participants = quiz.participants.sort(compare);
        }
        const updatedQuiz = await quiz.save();
        sendEventsToAllInQuiz(quiz.participants, updatedQuiz);
        updateLeaderboard(quiz.participants);
    }

}

var gameLoopStart = async function gameLoopStart(quiz) {
    quiz.questionNumber++;
    timerHandler = setInterval(gameLoop, quiz.timeLimit * 1000, quiz);
}

async function updateLeaderboard(quizParticipants) {
    const leaderboard = await Leaderboard.findById("main");
    let sortedQuizParticipants = quizParticipants.sort(compare);

    if (leaderboard.participants.length == 0) {
        if (leaderboard.maxParticipantCount < sortedQuizParticipants.length) {
            sortedQuizParticipants.length = leaderboard.maxParticipantCount;
        }
        leaderboard.participants = sortedQuizParticipants
        await leaderboard.save();
        return;
    }

    if (leaderboard.participants.length > leaderboard.maxParticipantCount) {
        let currentBottomOfLB = leaderboard.participants[leaderboard.participants.length - 1]
        sortedQuizParticipants = sortedQuizParticipants.filter(participant => participant.length < currentBottomOfLB);
    }
    leaderboard.participants = leaderboard.participants.concat(sortedQuizParticipants);
    leaderboard.participants = leaderboard.participants.sort(compare);
    if (leaderboard.maxParticipantCount < leaderboard.participants.length) {
        leaderboard.participants.length = leaderboard.maxParticipantCount;
    }


    await leaderboard.save();
}

var compare = function (a, b) {
    return parseInt(a.score) - parseInt(b.score);
}



//Associative array to store participant. Works like a hash table or dictionary data structure
//Participant IDs are used as keys, and res objects are values. Allows for quick look up of participant res object needed for SSE.
var participantList = {}


//Exports methods so they are usable by other files
var methods = { eventsHandler, sendEventsToAllInQuiz, gameLoopStart }
exports.data = methods;

