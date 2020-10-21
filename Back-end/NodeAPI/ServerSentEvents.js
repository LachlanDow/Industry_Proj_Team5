const Participant = require("./models/Participant");
const Quiz = require("./models/Quiz");

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
//Adds participants res object to associative array
try { 
    participantList[req.params.participantId] = res;
 } catch(e) {
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
        if(participantList[participant.id] !== undefined)
        {
            participantList[participant.id].write(`data: ${JSON.stringify(eventContent)}\n\n`);
        }
    }
    catch(e) {
        console.log(e);
      }
});
}

var timerHandler;

  async function gameLoop(quiz) {
    let updatedQuiz = await Quiz.findById(quiz._id);
    updatedQuiz.questionNumber++;

    if (updatedQuiz.questionNumber <= updatedQuiz.questionCount) {
        for (i = 0; i < updatedQuiz.participants.length-1; i++) {
            for (j = 0; j < updatedQuiz.participants[0].powerups.length-1; j++) {
                updatedQuiz.participant[i].powerups[j].active = false;
                console.log(updatedQuiz.participant[i].powerups);
            }
          }
        
        updatedQuiz = await updatedQuiz.save();
        sendEventsToAllInQuiz(updatedQuiz.participants, updatedQuiz);
    }
    else {
        clearInterval(timerHandler);
        updatedQuiz.questionNumber = -1;
        updatedQuiz.participants = updatedQuiz.participants.sort(compare);
        updatedQuiz = await updatedQuiz.save();
        sendEventsToAllInQuiz(updatedQuiz.participants, updatedQuiz);
    }

}

var gameLoopStart = async function gameLoopStart(quiz) { 
    quiz.questionNumber++;
    timerHandler = setInterval(gameLoop, quiz.timeLimit * 1000, quiz);
}

//Associative array to store participant. Works like a hash table or dictionary data structure
//Participant IDs are used as keys, and res objects are values. Allows for quick look up of participant res object needed for SSE.
var participantList = {}


//Exports methods so they are usable by other files
var methods = {eventsHandler, sendEventsToAllInQuiz, gameLoopStart}
exports.data = methods;

