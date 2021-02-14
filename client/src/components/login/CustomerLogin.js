import React, { useState, useContext } from "react";
import {Redirect} from 'react-router-dom'
import authContext from '../../context/auth/authContext'
import alertContext from '../../context/alert/alertContext'
import {
  Container,
  TextField,
  Button,
} from '@material-ui/core';

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

  const _textFieldMinWidth = 350;

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
          return setAlert('Passwords do not match!', "error");          
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
    
    <Container
      maxWidth='lg'
      style={{
        // backgroundColor:'#ccc',
        // paddingTop: 64,
        minHeight:'90vh'
      }}    
    >
      <div 
        className='flexrow justify-content-center' 
        style={{minHeight:'90vh'}}
      >
        <div 
          className='flexcol h-100 justify-content-center'
          style={{minHeight:'90vh'}}
        >
          <form className='col s12' onSubmit={e => onSubmit(e)}>
            <h1 className='text-center mb-2'>User Login</h1>
            <div className="mb-2" style={{minWidth: _textFieldMinWidth}}>
              <TextField
                placeholder='Username'
                label='Username'
                required
                id='userName'
                name='username'
                value={username}
                onChange={e => onChange(e)}
                variant='outlined'
                fullWidth={true}
              />
            </div>
            <div className="mb-2" style={{minWidth: _textFieldMinWidth}}>
              <TextField
                placeholder='Email'
                label='Email'
                required
                id='email'
                name='email'
                value={email}
                type='email'
                onChange={e => onChange(e)}
                variant='outlined'
                fullWidth={true}
              />
            </div>
          
            { loginMode === 'signup' && (
              <>
                <div className="mb-2" style={{minWidth: _textFieldMinWidth}}>
                  <TextField
                    placeholder='Name'
                    label='Name'
                    required
                    id='personName'
                    name='personName'
                    value={personName}
                    type='text'
                    onChange={e => onChange(e)}
                    variant='outlined'
                    fullWidth={true}
                  />
                </div>
                <div className="mb-2" style={{minWidth: _textFieldMinWidth}}>
                  <TextField
                    placeholder='Middle Name'
                    label='Middle Name'
                    // required
                    id='middleName'
                    name='middleName'
                    value={middleName}
                    type='text'
                    onChange={e => onChange(e)}
                    variant='outlined'
                    fullWidth={true}
                  />
                </div>
                <div className="mb-2" style={{minWidth: _textFieldMinWidth}}>
                  <TextField
                    placeholder='Last Name'
                    label='Last Name'
                    required
                    id='lastName'
                    name='lastName'
                    value={lastName}
                    type='text'
                    onChange={e => onChange(e)}
                    variant='outlined'
                    fullWidth={true}
                  />
                </div>
                <div className="mb-2" style={{minWidth: _textFieldMinWidth}}>
                  <TextField
                    placeholder='Telephone'
                    label='Telephone'
                    // required
                    id='tel1'
                    name='tel1'
                    value={tel1}
                    type='text'
                    onChange={e => onChange(e)}
                    variant='outlined'
                    fullWidth={true}
                  />
                </div>                  
              </>
            )}
            <div className="mb-2" style={{minWidth: _textFieldMinWidth}}>
              <TextField
                placeholder='Enter Password'
                label='Password'
                required
                id='password'
                name='password'
                value={password}
                type='password'
                onChange={e => onChange(e)}
                variant='outlined'
                fullWidth={true}
              />
            </div>         
            {
              loginMode === 'signup' && (              
                <div className="mb-2" style={{minWidth: _textFieldMinWidth}}>
                  <TextField
                    placeholder='Confirm Password'
                    label='Confirm Password'
                    required
                    id='confirmPassword'
                    name='confirmPassword'
                    value={confirmPassword}
                    type='password'
                    onChange={e => onChange(e)}
                    variant='outlined'
                    fullWidth={true}
                  />
                </div>
              )
            }
            <div className='mb-1 mt-1'>
              <a href='#'>Forgot Password?</a>
            </div>              
            <Button
              variant='contained'
              color='secondary'
              fullWidth
              type='submit'
            >
              { loginMode === 'login' ? 'Login' : 'Register' }                
            </Button>
            <div className="flexrow justify-content-space-between pt-4">         
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
                  <Button  
                    href='#'
                    style={{
                      // lineHeight:'3.2rem'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      setLoginMode('signup');
                    }}
                    color='secondary'
                  >Register</Button>
                  )
                : (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setLoginMode('login');
                    }}
                    color='secondary'
                  >
                    Login
                  </Button>                      
                )
              }
            </div>
          </form> 
        </div>
      </div>
    </Container>
  );
};

export default CustomerLogin;
