const express = require("express");
const router = express.Router();
const Leaderboard = require("../models/Leaderboard");

//Get leaderboard by ID when get made to leaderboards/(leaderboardID)
router.get("/:id", async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find()
        res.json(leaderboard)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = router;