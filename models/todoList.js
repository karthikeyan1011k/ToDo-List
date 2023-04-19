const mongoose = require("mongoose");

// create the database Schema 
const todoListSchema = new mongoose.Schema({
  todoList: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  Category: {
    type: String,
    required: true,
  },
});

// Export the Schema
const TodoList = mongoose.model("TodoList", todoListSchema);
module.exports = TodoList;
