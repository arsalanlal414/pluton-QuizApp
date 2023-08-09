const asyncHandler = require("express-async-handler") // it removes the try catch block and detects error by itself
const QuizResult = require("../models/quizResultModel")


const getQuizResults = asyncHandler(async (req, res) => {
    try {
      const quizResults = await QuizResult.find().sort({ date: -1 });
      res.status(200).json(quizResults);
    }catch (error) {
      res.status(500).json({ error: 'Failed to fetch quiz results' });
    }
})


const getQuizResult = asyncHandler(async (req, res) => {
    const userId = await req.params.id
    console.log(userId)
    try {
      const quizResults = await QuizResult.find({userId});
      res.status(200).json(quizResults);
    }catch (error) {
      res.status(500).json({ error: 'Failed to fetch quiz results' });
    }
})


const submitQuiz = asyncHandler( async (req, res) => {
    try {
      const { username, email, userId, title, description, subject, date, score, total } = req.body;
      const newQuizResult = new QuizResult({
        username,
        email,
        userId,
        title,
        description,
        subject,
        date,
        score,
        total
      });
      await QuizResult.create(newQuizResult);
      res.status(201).json(newQuizResult);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create quiz result' });
    }
})


module.exports = {submitQuiz, getQuizResults, getQuizResult}