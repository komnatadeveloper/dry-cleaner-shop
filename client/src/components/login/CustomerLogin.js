import React, { useState, useContext } from "react";
import {Redirect} from 'react-router-dom'
import authContext from '../../context/auth/authContext'
import alertContext from '../../context/alert/alertContext'

const CustomerLogin = () => {
  const authContext1 =  useContext(authContext);
  const alertContext1 =  useContext(alertContext);
  const { 
    userLogin, 
    userRegister,
    isAuthenticated, 
    userType, 
    loading, 
    user
  } = authContext1
  const { 
    setAlert
  } = alertContext1

  const [ loginMode, setLoginMode ] = useState('login');  // 'login' || 'signup'


  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: '',
    personName: '',
    middleName: '',
    tel1: '',
    lastName: '',
  });

  const { 
    username, 
    email, 
    password, 
    // for 'signup'
    confirmPassword,
    personName,
    middleName,
    tel1,
    lastName
  } = formData

    const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const onSubmit = async e => {
      e.preventDefault();
      if ( loginMode === 'login' ) {
        userLogin(formData);      
      } 
      else {  // loginMode === 'signup'
        if ( password !== confirmPassword ) {
          return setAlert('Passwords do not match!', "danger");          
        }
        userRegister(formData);
      }
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
          { loginMode === 'signup' && (
            <>
              <div className='row'>
                <div className='input-field col s6'>
                  <input
                    placeholder='Name'
                    required
                    id='personName'
                    type='text'
                    className='validate'
                    name='personName'
                    value={personName}
                    onChange={e => onChange(e)}
                  />
                  <label htmlFor='personName'>Name</label>
                </div>
                <div className='input-field col s6'>
                  <input
                    placeholder='Middle Name'                  
                    id='middleName'
                    type='text'
                    className='validate'
                    name='middleName'
                    value={middleName}
                    onChange={e => onChange(e)}
                  />
                  <label htmlFor='Email'>Middle Name</label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s6'>
                  <input
                    placeholder='Last Name'
                    id='lastName'
                    type='text'
                    className='validate'
                    name='lastName'
                    value={lastName}
                    onChange={e => onChange(e)}
                  />
                  <label htmlFor='lastName'>Last Name</label>
                </div>
                <div className='input-field col s6'>
                  <input
                    placeholder='Telephone'                  
                    id='tel1'
                    type='text'
                    className='validate'
                    name='tel1'
                    value={tel1}
                    onChange={e => onChange(e)}
                  />
                  <label htmlFor='tel1'>Telephone</label>
                </div>
              </div>
            </>
          )}
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
          {
            loginMode === 'signup' && (

              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    id='confirmPassword'
                    required
                    type='password'
                    className='validate'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={e => onChange(e)}
                  />
                  <label htmlFor='password'>Confirm Password</label>
                </div>
              </div>
            )
          }
          <div className='row'>
            <div className='col s6 '>
              <a href='#'>Forgot Password?</a>
            </div>
            <div className='col s6 right'>
              <button
                type='submit'
                className='btn full waves-effect waves-light green-darken-2  right'
              >
                { loginMode === 'login' ? 'Login' : 'Register' }                
              </button>
            </div>
          </div>
          <div 
            className='row center'
          >
            <div className="flexrow justify-content-center">
              
              <p 
                className='mr-4'
                style={{
                  lineHeight:'3.2rem',
                  marginBlockStart:'0',                 
                  marginBlockEnd:'0',                 
                }}
              >
                {
                  loginMode === 'login' && 'Don\'t have an account?'
                }
                {
                  loginMode === 'signup' && 'Already have an account?'
                }                
              </p>
              {
                loginMode === 'login'
                ? (                  
                  <a  
                    href='#'
                    style={{
                      lineHeight:'3.2rem'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      setLoginMode('signup');
                    }}
                  >Register</a>
                  )
                : (
                  <a  
                    href='#'
                    style={{
                      lineHeight:'3.2rem'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      setLoginMode('login');
                    }}
                  >Login</a>
                )
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerLogin;
