import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './submissions.scss'; 

function Submissions() {
  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    fetchQuizResults();
  }, []);

  const fetchQuizResults = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/quizzes/results');
      setQuizResults(response.data);
    } catch (error) {
      console.error('Error fetching quiz results:', error);
    }
  };

  return (
    <div className="admin-quiz-results">
      <h2>Admin Quiz Results</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Quiz Title</th>
            <th>Description</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {quizResults.map((result) => (
            <tr key={result._id}>
              <td>{result.username}</td>
              <td>{result.email}</td>
              <td>{result.title}</td>
              <td>{result.description}</td>
              <td>{result.subject}</td>
              <td>{new Date(result.date).toLocaleDateString()}</td>
              <td>{result.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Submissions;