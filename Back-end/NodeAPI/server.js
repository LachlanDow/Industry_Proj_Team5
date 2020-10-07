const express = require('express');
const mongoose = require("mongoose");
const SSE = require('./ServerSentEvents');

const app = express();

//Establish connection to database
mongoose.connect("mongodb://34.105.235.219:27017", { useNewUrlParser: true }); 
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));
app.use(express.json());

//Declaring routers for different routes
const questionsRouter = require("./routes/question");
const quizRouter = require("./routes/quiz");

app.use("/questions", questionsRouter);
app.use("/quiz", quizRouter);
app.use("/categories", quizRouter);

//App listen on specified port
app.listen(3000, () => console.log('server has started at port 3000'));

//If there is a get request to stream endpoint, call the events handler from Server Sent Events
app.get('/stream/:participantId', SSE.data.eventsHandler);
