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
// Generate an id based on timestamp and save res
// object of client connection on clients list
try { 
    participantList[req.params.participantId] = res

 } catch(e) {
   console.log(e);
 }

//When client closes connection, update the clients list to remove client
req.on('close', () => {
console.log(`${req.params.participantId} Connection closed`);
delete participantList[req.params.participantId];
});
}

//Function to send passed in JSON object as a string to client 
//so that client can then parse this string to have the object sent to them
var sendEventsToAllInQuiz = function sendEventsToAllInQuiz(particpantsInQuiz, eventContent) {
particpantsInQuiz.forEach(function (participant) {
    try { 
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

var participantList = {}


//Exports methods so they are usable by other files
var methods = {eventsHandler, sendEventsToAllInQuiz}
exports.data = methods;

