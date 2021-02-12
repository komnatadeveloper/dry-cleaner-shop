import React, {useContext, useState, useEffect, } from 'react';
import { NavLink} from 'react-router-dom';
import authContext from '../../../context/auth/authContext';
import {
  Container,
  CircularProgress,
  Button,
  Grid,
  TextField
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

export const AccountUserPage = () => {
  const authContext1 = useContext(authContext)
  const {
    loading,  
    user,
    userUpdateSelfAccount,
  } = authContext1;
  const [formData, setFormData] = useState({
    _id: '',
    name:"",
    middleName:"",
    surName:"",
    username: "",
    email:"", 
    tel1:"",
    tel2:"", 
    address:"",
    balance:""
  });
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if( !loading ) {
      setFormData({
        ...user
      })
    }
  }, [loading]);

  const {  
    _id,  
    name,
    middleName,
    surName,
    username,
    email,
    tel1,
    tel2,
    address,
    balance,
  } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    userUpdateSelfAccount({
      formData
    });

  }

  return (
    <Container 
      maxWidth='lg'
      style={{
        backgroundColor:'#ccc',
        // paddingTop: 64,
        minHeight:'90vh'
      }}
    >
      <form 
        className='flexcol justify-content-space-between'
        style={{
          minHeight:'90vh'
        }}
        onSubmit={e => onSubmit(e)}
      >
        <div>          
          {
            loading 
              ? (
                  <div 
                    className='flexrow justify-content-center'
                    style={{
                      minHeight: 180,
                      paddingTop: 120
                    }}
                  >
                    <CircularProgress />
                  </div>
                )
              : (
                <div>
                  <h2 className='text-center mt-3 mb-2'>Account</h2>
                  <Grid container spacing={3}>
                    <Grid
                      xs={12}
                    >                  
                      <TextField
                        placeholder='Username'
                        disabled={true}
                        fullWidth={true}
                        id='username'
                        size='medium'
                        type='text'
                        autoComplete={false}
                        className='validate'
                        name='username'
                        value={username}
                        label='User Name'
                      />
                    </Grid>                  
                    <Grid  xs={12} md={4}>
                      <div className='mx-1 mt-1'>
                        <TextField
                          placeholder='Enter name'
                          required={true}
                          fullWidth={true}
                          id='name'
                          // size='medium'
                          type='text'
                          autoComplete={false}
                          name='name'
                          value={name}
                          onChange={e => onChange(e)}
                          label='Name'
                        />
                      </div>
                    </Grid>
                    <Grid  xs={12} md={4}>
                      <div className='mx-1 mt-1'>
                        <TextField
                          placeholder='Enter Middlename'
                          // required={true}
                          fullWidth={true}
                          id='middleName'
                          // size='medium'
                          type='text'
                          autoComplete={false}
                          name='middleName'
                          value={middleName}
                          onChange={e => onChange(e)}
                          label='Middlename'
                        />
                      </div>
                    </Grid>
                    <Grid  xs={12} md={4}>
                      <div className='mx-1 mt-1'>
                        <TextField
                          placeholder='Enter Surname'
                          fullWidth={true}
                          id='surName'
                          type='text'
                          autoComplete={false}
                          name='surName'
                          value={surName}
                          onChange={e => onChange(e)}
                          label='Surname'
                        />
                      </div>
                    </Grid>
                    <Grid  xs={12} md={4}>
                      <div className='mx-1 mt-2'>
                        <TextField
                          placeholder='Enter Email'
                          // required={true}
                          fullWidth={true}
                          disabled={true}
                          id='email'
                          type='text'
                          autoComplete={false}
                          name='email'
                          value={email}
                          label='Email'
                        />
                      </div>
                    </Grid>
                    <Grid  xs={12} md={4}>
                      <div className='mx-1 mt-2'>
                        <TextField
                          placeholder='Enter Phone Num1'
                          // required={true}
                          fullWidth={true}
                          id='tel1'
                          type='text'
                          autoComplete={false}
                          name='tel1'
                          value={tel1}
                          onChange={e => onChange(e)}
                          label='Tel1'
                        />
                      </div>
                    </Grid>            
                    <Grid  xs={12} md={4}>
                      <div className='mx-1 mt-2'>
                        <TextField
                          placeholder='Enter Phone Num2'
                          fullWidth={true}
                          id='tel2'
                          type='text'
                          autoComplete={false}
                          name='tel2'
                          value={tel2}
                          onChange={e => onChange(e)}
                          label='Tel2'
                        />
                      </div>
                    </Grid>            
                    <Grid  xs={12}>
                      <div className='mt-2'>
                        <TextField
                          disabled={true}
                          fullWidth={true}
                          id='balance'
                          type='text'
                          autoComplete={false}
                          name='balance'
                          value={( balance === undefined || balance === '') ?  '-' : `$${(parseFloat(balance)).toFixed(2)}`}
                          label='Balance'
                        />
                      </div>
                    </Grid>            
                    <Grid  xs={12}>
                      <div className='mt-2'>
                        <TextField
                          fullWidth={true}
                          id='address'
                          type='text'
                          autoComplete={false}
                          name='address'
                          value={address}
                          onChange={e => onChange(e)}
                          label='Address'
                        />
                      </div>
                    </Grid>
                  </Grid>
                </div>
            )
          }
          
        </div>
        <div className='mb-2 pt-3 flexrow'>
          <Button
            size='large'
            disabled={loading}
            variant='contained'
            color='secondary'
            endIcon= {<SendIcon />}
            type='submit'
          >
            Update
          </Button>
          <div className="ml-2">
            <Button
              size='large'
              component={NavLink}
              disabled={loading}
              variant='contained'
              color='secondary'
              endIcon= {<SendIcon />}
              to={`/user-main/change-password`}
              // type='submit'
            >
              Change Password
            </Button>
          </div>
          
        </div>
      </form>
    </Container>
  );
}
