var eventsHandler = function eventsHandler(req, res, next) {
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
const clientId = Date.now();
const newClient = {
id: clientId,
res
};

clients.push(newClient);
//When client closes connection, update the clients list to remove client
req.on('close', () => {
console.log(`${clientId} Connection closed`);
clients = clients.filter(c => c.id !== clientId);
});
}

//Function to send passed in JSON object as a string to client 
//so that client can then parse this string to have the object sent to them
var sendEventsToAll = function sendEventsToAll(eventContent) {
clients.forEach(c => c.res.write(`data: ${JSON.stringify(eventContent)}\n\n`));
}

let clients = [];

//Exports methods so they are usable by other files
var methods = {eventsHandler, sendEventsToAll}
exports.data = methods;

