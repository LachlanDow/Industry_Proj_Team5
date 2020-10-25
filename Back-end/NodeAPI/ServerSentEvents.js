//File handling Server Sent Events, which is how the server can communicate with clients, 
//without the need for the client to make a request every time, or for complex and heavy to implement tech like sockets

const Participant = require("./models/Participant");
const Quiz = require("./models/Quiz");
const Leaderboard = require("./models/Leaderboard");

//Function to add particpants to stream - function called when participant subscribes using their particpant ID
//This allows them to recieve notifications for the quiz they are in
var eventsHandler =  async function eventsHandler(req, res) {
// Mandatory headers and http status to keep connection open. Also header to stop CORS from being disallowed on browser.
const headers = {
'Content-Type': 'text/event-stream',
'Connection': 'keep-alive',
'Cache-Control': 'no-cache',
'Access-Control-Allow-Origin': '*'
};
res.writeHead(200, headers);
const quiz = await Quiz.find({ "participants._id": req.params.participantId });
res.connection.setTimeout(0);
///Adds participants res object to associative array
//this works like hash table or dictionary, allowing quick lookup of res object needed to send SSE using participant ID
try { 
    participantList[req.params.participantId] = res;
 } catch(e) {
   console.log(e);
 }
 res.write(`data: ${JSON.stringify(quiz[0])}\n\n`);
  //stops server from disconnecting to client
  res.connection.setTimeout(0);

//When client closes connection, update the clients list to remove client
req.on('close', () => {
console.log(`${req.params.participantId} Connection closed`);
//Removes entry from associative array if participant leaves
delete participantList[req.params.participantId];
});
}

//Sends an object to all the participants in a quiz using a Server Sent Event.
//Takes the list of participants as a parameter, and the event content to be sent to other participants
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

//Main game loop function. Called repeatedly using setInterval. 
async function gameLoop(quiz) {
    //Finds quiz in DB so most up to date version of quiz is used
    let updatedQuiz = await Quiz.findById(quiz._id);
    //Increment question number
    updatedQuiz.questionNumber++;

    //If the question number is less than or equal to the max number of questions
    if (updatedQuiz.questionNumber <= updatedQuiz.questionCount) {
        //Set everyones active powerups back to false. If a powerup was active also make it unavailable
        for (i = 0; i < updatedQuiz.participants.length; i++) {
            for (j = 0; j < updatedQuiz.participants[0].powerups.length; j++) {
                if(updatedQuiz.participants[i].powerups[j].active) { 
                    updatedQuiz.participants[i].powerups[j].active = false;
                    updatedQuiz.participants[i].powerups[j].available = false;
                }
                
            }
        }
        //Save updated quiz back to DB
        updatedQuiz = await updatedQuiz.save();
        //Send this quiz state to all in quiz
        sendEventsToAllInQuiz(updatedQuiz.participants, updatedQuiz);
    }
    else {
        //If the quiz is complete - the question number exceeds the desired max number of questions
        //Stop calling function on loop. Associative array used to find timer handler for quiz
        clearInterval(quizTimerHandlers[quiz._id]);
        //Set quiz question number to -1, code for quiz ended
        updatedQuiz.questionNumber = -1;
        //Sort participants by score for leaderboard
        updatedQuiz.participants = updatedQuiz.participants.sort(compare);
        updatedQuiz = await updatedQuiz.save();
        sendEventsToAllInQuiz(updatedQuiz.participants, updatedQuiz);
        updateLeaderboard(updatedQuiz.participants);
    }

}

//Starts game loop of quiz. Starts calling game loop function repeatedly after each timelimit seconds elapses
var gameLoopStart = async function gameLoopStart(quiz) {
    quiz.questionNumber++;
    let timerHandler = setInterval(gameLoop, quiz.timeLimit * 1000, quiz);
    //Adds timer handler to associative array for the quiz, so that the timer for this quiz can be stopped later without affecting other quizzes
    quizTimerHandlers[quiz._id] = timerHandler;
}

//Updated global leaderboard
async function updateLeaderboard(quizParticipants) {
    //Find global leaderboard from DB
    const leaderboard = await Leaderboard.findById("main");
    let sortedQuizParticipants = quizParticipants.sort(compare);

    //If there are more participants or the same number in the leaderboard than the max
    //set the current bottom of leaderboard,  and then remove players from the list whose score is not better than the bottom
    if (leaderboard.participants.length >= leaderboard.maxParticipantCount) {
        let currentBottomOfLB = leaderboard.participants[leaderboard.participants.length - 1]
        sortedQuizParticipants = sortedQuizParticipants.filter(participant => participant.length < currentBottomOfLB);
    }
    //Concatenate the leaderboard list with the sortedParticipants from quiz
    leaderboard.participants = leaderboard.participants.concat(sortedQuizParticipants);
    //Sort this new list in order
    leaderboard.participants = leaderboard.participants.sort(compare);
    //Cut down to desired size if new list exceeds this
    if (leaderboard.maxParticipantCount < leaderboard.participants.length) {
        leaderboard.participants.length = leaderboard.maxParticipantCount;
    }


    await leaderboard.save();
}

//Used to sort participant lists based on their score
var compare = function (a, b) {
    return parseInt(a.score) - parseInt(b.score);
}



//Associative array to store participant. Works like a hash table or dictionary data structure
//Participant IDs are used as keys, and res objects are values. Allows for quick look up of participant res object needed for SSE.
var participantList = {}

//Associative array to store timer handlers. Works like a hash table or dictionary data structure
//quiz IDs are used as keys, and timer handler objects are values. Allows for quick look up of quiz timer handler object needed to stop game loop.
var quizTimerHandlers = {}


//Exports methods so they are usable by other files
var methods = { eventsHandler, sendEventsToAllInQuiz, gameLoopStart }
exports.data = methods;

