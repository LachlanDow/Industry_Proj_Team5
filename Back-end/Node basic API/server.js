const express = require('express');
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://34.105.235.219:27017", { useNewUrlParser: true }); 
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));
app.use(express.json());
const questionsRouter = require("./routes/question");
app.use("/questions", questionsRouter);
app.listen(3000, () => console.log('server has started at port 3000'));

