import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminDashboard.scss'
import { FaUser } from 'react-icons/fa';
import { TbDeviceImacQuestion } from 'react-icons/tb';
import { AiOutlineSolution } from 'react-icons/ai';
import { Link, Route, useNavigate } from 'react-router-dom';


function AdminDashboard() {
  
  const [users, setUsers] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const navigate = useNavigate()
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
  
  function handleNavigation(route){
    navigate(`${route}`)
  }

  useEffect(() => {
    fetchUsers();
  }, [users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/users');
      setUsers(response.data.length);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/quizzes'); 
      setQuizData(response.data);
      console.log(response)
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };


  return (
    <div className='admin-dashboard'>
      <div className='users'>
        <FaUser fontSize={70} color='rgba(12, 130, 75)'/>
        <h2>USERS: {users}</h2>
        <button className='detail-button' onClick={()=>{handleNavigation('/admin/users')}}>Details</button>
      </div>
      <div className='quizes'>
        <TbDeviceImacQuestion fontSize={70}  color='rgba(12, 130, 75)'/>
        <h2>Quizes: {quizData.length}</h2>
        <button className='detail-button' onClick={()=>{handleNavigation('/admin/quizes')}}>Details</button>
      </div>
      <div className='submission'>
        <AiOutlineSolution fontSize={70}  color='rgba(12, 130, 75)'/>
        <h2>Submissions: {quizResults.length}</h2>
        <button className='detail-button' onClick={()=>{handleNavigation('/admin/submission')}}>Details</button>
      </div>
    </div>
  )
}

export default AdminDashboard