import React, { useContext, useState } from "react";
import authContext from "../../context/auth/authContext";
import { Redirect } from "react-router-dom";

const AdminLogin = () => {

  const authContext1 = useContext(authContext);
  const { adminLogin, isAuthenticated, userType, loading, user } = authContext1;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const { username, email, password } = formData;

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

  // const divStyle = {
  //   maxWidth: "650px",
  //   maxHeigt: "750px",

  // } 
  
  return (
    <div id='admin-login-component-div'>
      <div className='row'>
        <form className='col s12' onSubmit={e => onSubmit(e)}>
          <div className='row'>
            <div className='input-field col s12'>
              <h1 className='center'>Admin Login</h1>
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
}

export default AdminLogin
