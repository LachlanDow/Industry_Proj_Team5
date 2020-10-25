const mongoose = require("mongoose");
const Participant = require("../models/Participant");
const Schema = mongoose.Schema;

//Schema for leaderboard documents in DB. Leaderboard documents have an automatically provided ID, a list of participants, a max number of participants to be
//stored in the list, and an ID. 
const leaderboardSchema = new Schema({ 
    _id: 'String',
    participants: [Participant.schema],
    maxParticipantCount: 'Number'
});

//Model must be exported to be used in routing to manipulate DB.
const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);
module.exports = Leaderboard;