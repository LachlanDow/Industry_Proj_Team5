const express = require("express");
const router = express.Router();
const Leaderboard = require("../models/Leaderboard");

router.get("/:id", async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find()
        res.json(leaderboard)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = router;