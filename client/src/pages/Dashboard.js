import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './dashboard.scss'

function Dashboard() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("all");
  const [menu, setMenu] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchQuizData(); 
  }, []);

  useEffect(() => {
    filterQuizData();
  }, [subject]);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/quizzes'); // Replace with your API endpoint
      setData(response.data);
      setMenu(response.data)
      console.log(response)
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const filterQuizData = () => {
    if (subject === "all") {
      fetchQuizData()
    } else {
      const filteredData = menu.filter(item => item.subject === subject);
      setData(filteredData);
    }
  };

  const handleQuizClick = (item) => {
    navigate(`/quiz/${item._id}`, { state: { quizData: item }, target: "_blank" }); // Open in a new tab
  };

  const uniqueSubjects = [...new Set(menu.map(item => item.subject))];

  return (
    <div className='dashboard'>
      <div className='filter-quiz'>
        <p>Filter: </p>
        <select name="subjects" id="subject" onChange={(e) => setSubject(e.target.value)}>
          <option value="all">all</option>
          {uniqueSubjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
          
        </select>
      </div>
      <ul>
        {data.map(item => (
          <li key={item._id} className='quiz-card'>
            <h1>{item.title}</h1>
            <button onClick={() => handleQuizClick(item)}>Start</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard;