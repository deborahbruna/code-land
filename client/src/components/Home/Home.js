import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Register from './Register';
import Login from './Login';

export default function Home() {

  const [loginForm, setLoginForm] = useState(true);

  const handleFormChange = () => {
    setLoginForm(!loginForm)
  }

  return (
    <div className="wrapper">
      <Navbar />
      <div className="content home">
        <div className='page-art'></div>
        <div className="register-content">
          {loginForm ?
            <Login />
            :
            <Register />
          }
          {loginForm ?
            <span className="form-text">Don't have an account? <span className="form-link-span" onClick={() => handleFormChange()}>Register</span></span>
            :
            <span className="form-text">Already have an account? <span className="form-link-span" onClick={() => handleFormChange()}>Login</span></span>
          }
        </div>


      </div>
    </div>
  )
}