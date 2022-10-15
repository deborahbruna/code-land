import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';

export default function Home() {

  const [loginForm, setLoginForm] = useState(true);

  const handleFormChange = () => {
    setLoginForm(!loginForm)
  }

  return (
    <div className='content'>
      <div className='column home-image'></div>
      <div className='column background-grey padding-1'>
        <div className='form-box'>
          {loginForm ?
            <Login />
            :
            <Register />
          }
          {loginForm ?
            <span className='form-text'>Don't have an account? <span className='form-link-span' onClick={() => handleFormChange()}>Register</span></span>
            :
            <span className='form-text'>Already have an account? <span className='form-link-span' onClick={() => handleFormChange()}>Login</span></span>
          }
        </div>
      </div>
    </div>
  )
}