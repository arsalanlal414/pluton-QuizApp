const mongoose = require('mongoose')

// Quiz Schema
const questionSchema = new mongoose.Schema({
    id: Number,
    title: String,
    options: {
      type: Map,
      of: String,
    },
    answer: String,
  });
  
  const quizSchema = new mongoose.Schema({
    title: String,
    description: String,
    subject: String,
    questions: [questionSchema],
    date: {
      type: Date,
      default: Date.now,
    },
  });
  
 module.exports = mongoose.model('Quiz', quizSchema);