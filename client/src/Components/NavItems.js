import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function NavItems({setIsActive}) {

    const navigate = useNavigate()
    const login = localStorage.getItem("accessToken")

    function handleLogOut(){
        localStorage.setItem("accessToken", "")
        navigate("/")
    }

  return (
    <nav className='nav'>
        {
            !login ?
            <ul>
                <li onClick={()=> setIsActive(true)}><p><Link to="/">Home</Link></p></li>
                <li onClick={()=> setIsActive(true)}><p><Link to="/login">Sign in</Link></p></li>
                <li onClick={()=> setIsActive(true)}><p><Link to="/signup">Sign Up</Link></p></li> 
            </ul>:
            <ul>
                <li onClick={()=> setIsActive(true)}><p><Link to="/dashboard">Dashboard</Link></p></li>
                <li onClick={()=> setIsActive(true)}><p><Link to="/history">History</Link></p></li>
                <li onClick={handleLogOut}><p>Sign Out</p></li>
            </ul>
        }
    </nav>
  )
}

export default NavItems