const mongoose = require("mongoose");
const Participant = require("../models/Participant");
const Schema = mongoose.Schema;

const leaderboardSchema = new Schema({ 
    _id: 'String',
    participants: [Participant.schema],
    maxParticipantCount: 'Number'
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

module.exports = Leaderboard;