import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import './quiz.scss';

function Quiz() {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    userId: '',
  });

  useEffect(() => {
    const userID = async () => {
      const token = await localStorage.getItem('accessToken');
      if (token) {
        const decodedToken = jwt_decode(token);
        const { username, email, id } = decodedToken.user;
        setUserData({ username, email, userId: id });
      } else {
        console.log('Token not found in local storage');
      }
    };
    userID();
  }, []);

  const quizData = state?.quizData || {};
  const totalQuestions = quizData.questions?.length || 0;

  const handleNextQuestion = () => {
    if (selectedOption === quizData.questions[currentQuestionIndex]?.answer) {
      setScore(score + 1);
    }

    setSelectedOption('');
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmit = async () => {
    const { title, description, subject } = quizData;
    const finalQuizData = {
      ...userData,
      title,
      description,
      subject,
      date: new Date().toISOString().split('T')[0],
      total: totalQuestions,
      score,
    };

    try {
      await axios.post('http://localhost:5001/api/quizzes/results', finalQuizData);
      alert(`Quiz completed! Your score: ${score}/${totalQuestions}`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (!quizData) {
    return <div className="quiz">No quiz data available.</div>;
  }

  const currentQuestion = quizData.questions[currentQuestionIndex] || {};

  return (
    <div className="quiz">
      <h1 className="quiz-title">Quiz</h1>
      {currentQuestionIndex < totalQuestions ? (
        <div className="quiz-question">
          <div className="quiz-title-align">
            <h3 className="quiz-info">Title: {quizData.title}</h3>
            <h3 className="quiz-info">Question {currentQuestionIndex + 1}/{totalQuestions}</h3>
          </div>
          <h4 className="quiz-question-title">{currentQuestion.title}</h4>
          <ul className="quiz-options">
            {Object.entries(currentQuestion.options || {}).map(([key, value]) => (
              <li key={key} className="quiz-option">
                <label>
                  <input
                    type="radio"
                    name="options"
                    value={key}
                    checked={selectedOption === key}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
          <button className="quiz-button" onClick={handleNextQuestion}>
            Next
          </button>
        </div>
      ) : (
        <div className="quiz-result">
          <h2 className="quiz-result-title">Quiz completed!</h2>
          <button className="quiz-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
