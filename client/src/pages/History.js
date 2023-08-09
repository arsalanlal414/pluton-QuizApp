import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import './history.scss';

function History() {
  const [quizResults, setQuizResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState('');
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    fetchQuizResults();
  }, [currentUser]);

  const fetchQuizResults = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/quizzes/results/${currentUser}`);
      console.log(response.data);
      setQuizResults(response.data);
      setFilteredResults(response.data);
    } catch (error) {
      console.error('Error fetching quiz results:', error);
    }
  };

  const handleFilterChange = event => {
    const value = event.target.value;
    setFilterCriteria(value);

    if (value === '') {
      setFilteredResults(quizResults);
    } else {
      const filtered = quizResults.filter(result =>
        result.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredResults(filtered);
    }
  };

  
  // Decode the JWT token to get user informationa
  useEffect(()=>{
    const userID = () =>{
      const token = localStorage.getItem("accessToken");
      if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.user.id;
      setCurrentUser(userId)
      console.log("user id is: ",userId, token);
    } else {
      console.log("Token not found in local storage");
    }
  }
  userID()
  },[])

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="quiz-history">
      <h2>Quiz History</h2>
      <div className="filter">
        <label htmlFor="filter">Filter by title: </label>
        <input
          type="text"
          id="filter"
          value={filterCriteria}
          onChange={handleFilterChange}
        />
      </div>
      {
        filteredResults.length > 0 ?
        <ul className="results-list">
          {filteredResults.map((result, index) => (
            <li key={index} className="quiz-result">
              <h3>{result.title}</h3>
              <p>{result.description}</p>
              <p>Date: {formatDate(result.date)}</p>
              <p>Score: {result.score} out of {result.total}</p>
            </li>
          ))}
        </ul> : 
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'70vh'}}>
          <h1>No Quiz Attempted Yet</h1>
        </div>
      }
    </div>
  );
}

export default History;