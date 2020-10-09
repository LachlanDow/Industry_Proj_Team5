const express = require('express');
const mongoose = require("mongoose");
const SSE = require('./ServerSentEvents');
const cors = require('cors');

const app = express();

//Establish connection to database
var password = process.env.DB_PASSWORD;
mongoose.connect(`mongodb://quizAdmin:${password}@34.105.157.233:27017/admin`, { useNewUrlParser: true }); 
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));
app.use(express.json());
app.use(cors());

//Declaring routers for different routes
const questionsRouter = require("./routes/Question");
const quizRouter = require("./routes/Quiz");

app.use("/questions", questionsRouter);
app.use("/quiz", quizRouter);
app.use("/categories", quizRouter);


//App listen on specified port
app.listen(3000, () => console.log('server has started at port 3000'));

//If there is a get request to stream endpoint, call the events handler from Server Sent Events
app.get('/stream/:participantId', SSE.data.eventsHandler);
