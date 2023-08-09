import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../form.scss'

const AdminLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate()

    const notify = () => toast.success('Logged in Successfully', {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });

    async function handleSubmit(event){
      event.preventDefault()
      console.log("waiting....")
      try{
        const response = await fetch('http://localhost:5001/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            email,
            password
          })
        })
        const data = await response.json()
        
        if(data.title){
          setError(data.message)
          setVisible(true)
        }else{
          localStorage.setItem("adminAccessToken", data.accessToken)
          notify()
          setTimeout(() => {
            navigate("/admin/dashboard")
          }, 2000);
        }
        
      }catch(err){
        console.log(err)
      }
      
    }

    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }, [visible]);

    const adminAccessToken = localStorage.getItem("adminAccessToken")
    console.log("admin: ",adminAccessToken)

    if(adminAccessToken) {
      return <Navigate to="/admin/dashboard" />;
    }
  
    return(
      <div className='login-signup'>
        <h1>Admin Login</h1>
        {visible ? <Alert severity="error">{error}</Alert> : null}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label><br />
            <input value={email} type="email" placeholder="Email..." onChange={(e)=> setEmail(e.target.value)} required/><br />
          </div>
          <div>
            <label htmlFor="password">Password</label><br />
            <input value={password} type="password" placeholder="Password..." onChange={(e)=> setPassword(e.target.value)} required/><br />
          </div>
          <input type="submit" value="Login"/>
        </form>
        <ToastContainer />
      </div>
    )
  }

  export default AdminLogin
  