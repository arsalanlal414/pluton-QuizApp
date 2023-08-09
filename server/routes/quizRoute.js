const express = require("express")
const router = express.Router()

const {deleteQuizzes, getQuizzes, createQuiz} = require("../controllers/quizController")
const {submitQuiz, getQuizResults, getQuizResult} = require("../controllers/quizResultControllers")
// const validateToken = require("../middleWare/validateTokenHandler")

// router.post("/", createQuizzes)
router.get('/', getQuizzes)
router.post('/', createQuiz)
router.delete('/:id', deleteQuizzes)

router.route('/results').post(submitQuiz).get(getQuizResults)
router.route('/results/:id').get(getQuizResult)

module.exports = router