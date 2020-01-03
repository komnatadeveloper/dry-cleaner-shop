import React, { useState, useContext } from "react";
import {Redirect} from 'react-router-dom'
import authContext from '../../context/auth/authContext'

const CustomerLogin = () => {
  const authContext1 =  useContext(authContext)

  const { userLogin, isAuthenticated, userType, loading, user} = authContext1

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const { username, email, password } = formData

    const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const onSubmit = async e => {
      e.preventDefault();
      userLogin(formData);      
    };

  // Redirect if Authenticated
  if (isAuthenticated && userType === "user" && !loading && user) {    
    return <Redirect to='/user-main' />;
  }

  // Redirect if Authenticated as an Admin
  if (isAuthenticated && userType === "Admin" && !loading && user) {    
    return <Redirect to='/dashboard' />;
  }

  return (
    <div id='user-login-component-div'>
      <div className='row'>
        <form className='col s12' onSubmit={e => onSubmit(e)}>
          <div className='row'>
            <div className='input-field col s12'>
              <h1 className='center'>User Login</h1>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s6'>
              <input
                placeholder='Username'
                required
                id='userName'
                type='text'
                className='validate'
                name='username'
                value={username}
                onChange={e => onChange(e)}
              />
              <label htmlFor='username'>Username</label>
            </div>
            <div className='input-field col s6'>
              <input
                placeholder='Email'
                required
                id='email'
                type='email'
                className='validate'
                name='email'
                value={email}
                onChange={e => onChange(e)}
              />
              <label htmlFor='Email'>Email</label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='password'
                required
                type='password'
                className='validate'
                name='password'
                value={password}
                onChange={e => onChange(e)}
              />
              <label htmlFor='password'>Password</label>
            </div>
          </div>
          <div className='row'>
            <div className='col s6 '>
              <a href='#'>Forgot Password?</a>
            </div>
            <div className='col s6 right'>
              <button
                type='submit'
                className='btn full waves-effect waves-light green-darken-2  right'
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerLogin;
