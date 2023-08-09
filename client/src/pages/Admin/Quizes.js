import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../dashboard.scss'
import { MdDelete } from 'react-icons/md';

function Quizes() {
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
      const response = await axios.get('http://localhost:5001/api/quizzes'); 
      setData(response.data);
      setMenu(response.data)
      console.log(response)
    }catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const filterQuizData = () => {
    if (subject === "all") {
      fetchQuizData()
      // setData(data);
    } else {
      const filteredData = menu.filter(item => item.subject === subject);
      setData(filteredData);
    }
  };

  const handleQuizClick = (item) => {
    navigate(`/quiz/${item._id}`, { state: { quizData: item }, target: "_blank" });
  };

  const handleDelete = async (id) =>{
    try {
      await axios.delete(`http://localhost:5001/api/quizzes/${id}`); 
      fetchQuizData()
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  }

  const uniqueSubjects = [...new Set(menu.map(item => item.subject))];

  return (
    <div className='dashboard'>
      <div className='quiz-menu'>
        <div className='filter-quiz'>
          <p >Filter: </p>
          <select name="subjects" id="subject" onChange={(e) => setSubject(e.target.value)}>
            <option value="all">all</option>
            {uniqueSubjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        <Link to='/admin/quizes/create'>
          <button>Create Quiz</button>
        </Link>
      </div>
      {/* <hr className='quiz-hr'/> */}
      <ul>
        {data.map(item => (
          <li key={item._id} className='quiz-card'>
            <h1>{item.title}</h1>
            <h4 style={{marginTop:"0px"}}>{item.description}</h4>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", gap:"10px"}}>
              {/* <button onClick={() => handleQuizClick(item)}>Start</button> */}
              <MdDelete fontSize={40} color='red' 
                style={{position:"relative",top:'2px', right:'0px', cursor:"pointer"}}
                onClick={()=>{handleDelete(item._id)}}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Quizes