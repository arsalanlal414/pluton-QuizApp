import React, { useState } from 'react'
import './navStyle.scss'
import { FaBars } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { Link, useNavigate } from 'react-router-dom';
import NavItems from './NavItems';

function NavBar() {
  const [isActive, setIsActive] = useState(true)
  const navigate = useNavigate()
  
  function handleNavigation(){
    navigate("/")
  }

  
  return (
    <div className='nav-container'>
      <div className='navbar'>
        <div className="container">
          <div className='logo'>
            <h1 onClick={handleNavigation}>QUIZ APP</h1>
          </div>
          <NavItems setIsActive={setIsActive}/>
          <div className='nav-icons'>
            {
              isActive ? 
                <FaBars className='nav-open' onClick={()=> setIsActive(false)}/> :
                <CgClose className='nav-close' onClick={()=> setIsActive(true)}/>
            }
          </div>
        </div>
      </div>
      <div className={`${isActive? "hidden": "dropdown" }`}>
          <NavItems setIsActive={setIsActive}/>
      </div>
    </div>
  )
}

export default NavBar