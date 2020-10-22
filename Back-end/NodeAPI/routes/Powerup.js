const express = require("express");
const Powerup = require("../models/Powerup");
const router = express.Router();


// Get All Powerups
router.get("/", async (req, res) => {
    try {
        const powerup = await Powerup.find({})
        res.json(powerup)
    } catch (err) {
      res.status(500).json({message: err.message})
    }
  });

  //Create powerup
  router.post("/", async (req, res) => {
    const powerup = new Powerup({
        name: req.body.name,
        available: false,
        active:false
        
    });
    try {
      const newPowerup = await powerup.save();
      res.status(201).json({ newPowerup });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Get powerup by id
  router.get("/:id", getPowerup, (req, res) => {
    res.json(res.powerup);
  });

  //getPowerup middleware - this allows multiple functions above which do the same thing (get powerup by id) to reuse the same code
async function getPowerup(req, res, next) {
    let powerup;
    try {
        powerup = await Powerup.find({ "_id": String(req.params.id) });//await Category.findById(req.params.id);
      if (powerup == null) {
        return res.status(404).json({ message: "Cannot find powerup" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.powerup = powerup;
    next();
  }

  module.exports = router;