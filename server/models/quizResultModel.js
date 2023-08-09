const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    username: String,
    email: String,
    userId: String,
    title: String,
    description: String,
    subject: String,
    date: Date,
    total: Number,
    score: Number,
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = QuizResult;