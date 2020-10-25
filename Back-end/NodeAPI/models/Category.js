const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema for category documents in DB. Category documents have a name and an ID, allowing them to be looked up by their ID
const categorySchema = new Schema({ 
    name: {
        type: String,
        required: true
    },
    _id: {
        type: String,
        required: true
    }
   
});

//Model must be exported to be used in routing to manipulate DB.
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;