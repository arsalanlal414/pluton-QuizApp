import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function NavItems({setIsActive}) {

    const navigate = useNavigate()
    const login = localStorage.getItem("adminAccessToken")

    function handleLogOut(){
        localStorage.setItem("adminAccessToken", "")
        navigate("/admin")
    }

  return (
    <nav className='nav'>
        {
            !login ?
            <ul>
                <li onClick={()=> setIsActive(true)}><p><Link to="/">Home</Link></p></li>
                <li onClick={()=> setIsActive(true)}><p><Link to="/admin">Sign in</Link></p></li>
                {/* <li onClick={()=> setIsActive(true)}><p><Link to="/signup">Sign Up</Link></p></li>  */}
            </ul>:
            <ul>
                <li onClick={()=> setIsActive(true)}><p><Link to="/admin/dashboard">Dashboard</Link></p></li>
                {/* <li onClick={()=> setIsActive(true)}><p><Link to="/admin/result">Results</Link></p></li> */}
                <li onClick={handleLogOut}><p>Sign Out</p></li>
            </ul>
        }
    </nav>
  )
}

export default NavItems