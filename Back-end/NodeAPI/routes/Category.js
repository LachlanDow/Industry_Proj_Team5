const express = require("express");
const Category = require("../models/Category");
const router = express.Router();
const Question = require("../models/Question");

// Get All Categories
router.get("/", async (req, res) => {
    try {
        const category = await Category.find({})
        res.json(category)
    } catch (err) {
      res.status(500).json({message: err.message})
    }
  });

  //Create category
  router.post("/", async (req, res) => {
    const category = new Category({
        name: req.body.name,
         _id: req.body.id
    });
    try {
      const newCategory = await category.save();
      res.status(201).json({ newCategory });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Get category by id
  router.get("/:id", getCategory, (req, res) => {
    res.json(res.category);
  });

  //getCategory middleware - this allows multiple functions above which do the same thing (get category by id) to reuse the same code
async function getCategory(req, res, next) {
    let category;
    try {
        category = await Category.find({ "_id": String(req.params.id) });//await Category.findById(req.params.id);
      if (category == null) {
        return res.status(404).json({ message: "Cannot find category" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.category = category;
    next();
  }

  module.exports = router;