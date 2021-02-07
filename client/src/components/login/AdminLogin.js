import React, { useContext, useState } from "react";
import authContext from "../../context/auth/authContext";
import { Redirect } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
} from '@material-ui/core';

const AdminLogin = () => {

  const authContext1 = useContext(authContext);
  const { adminLogin, isAuthenticated, userType, loading, user } = authContext1;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const { username, email, password } = formData;
  const _textFieldMinWidth = 350;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    adminLogin(formData);
    // console.log('SUCCESS');
  };

  // Redirect if Authenticated
  if (isAuthenticated && userType === "Admin" && !loading && user) {
    // console.log(isAuthenticated, userType, loading);
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
            <h1 className='text-center mb-2'>Admin Login</h1>
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
            <div className='mb-1 mt-1'>
              <a href='#'>Forgot Password?</a>
            </div>
            <Button
              variant='contained'
              color='secondary'
              fullWidth
              type='submit'
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default AdminLogin;
