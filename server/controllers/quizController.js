const asyncHandler = require("express-async-handler") // it removes the try catch block and detects error by itself
const Quiz = require("../models/quizModel")

// @desc get all quizzes
// @Route /api/quizzes
// @access public
const getQuizzes = asyncHandler( async (req, res) => {
    const quizzes = await Quiz.find()
    res.status(200).json(quizzes)
})

// @desc create quizzes
// @Route /api/quizzes
// @access public
const createQuiz = asyncHandler(async (req, res) => {
  try {
    const newQuiz = req.body;
    console.log(req.body)
    const response = await Quiz.create(newQuiz);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create quiz' });
  }
});

// @desc delete a quiz
// @Route /api/quizzes/:id
// @access public
const deleteQuizzes = asyncHandler(async (req, res)=>{
  const quiz = await Quiz.findById(req.params.id)
  
  if(!quiz){
      console.log("inside not statement")
      res.status(404);
      throw new Error("exercise  not found")
  }

  const result  = await Quiz.deleteOne({ _id: req.params.id })
  res.status(200).json(result)
})

module.exports = {getQuizzes, createQuiz, deleteQuizzes}