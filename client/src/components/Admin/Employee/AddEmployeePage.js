import React, {useState, useContext} from 'react';
import {
  Container,
  CircularProgress,
  Button,
  Grid,
  TextField
} from '@material-ui/core';
import adminContext from '../../../context/admin/adminContext'
import alertContext from '../../../context/alert/alertContext'
const AddEmployeePage = ({match}) => {
  const adminContext1 = useContext(adminContext);
  const {
    addNewEmployee
  } = adminContext1;
  const alertContext1 =  useContext(alertContext);
  const { 
    setAlert
  } = alertContext1;
  const _minInputWidth = 450;
  const _maxInputWidth = '90vw';
  const [formData, setFormData] = useState({
  email:"",
  username:"",
  password:"",
  confirmPassword:"",
  });  
  const {
    username,
    email,
    password,
    confirmPassword
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const _cbAddNewEmployee = (res) => {
    console.log(res);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if ( password !== confirmPassword ) {
      return setAlert('Passwords do not match!', "error");          
    }
    addNewEmployee({
      formData,
      cb: _cbAddNewEmployee
    });
    // If Update
    console.log('AddEmployeePage -> onSubmit -> FIRED ');
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
          <h2 className='text-center mt-3 mb-2'>Add Employee</h2>
          <Grid container spacing={3}>
            <Grid xs={12}>
              <div className="pt-4 flexrow justify-content-center">
                <div style={{minWidth: _minInputWidth, maxWidth:_maxInputWidth}}>
                  <TextField
                    placeholder='Username'
                    required={true}
                    fullWidth={true}
                    id='username'
                    size='medium'
                    type='text'
                    autoComplete={false}
                    className='validate'
                    name='username'
                    value={username}
                    onChange={e => onChange(e)}
                    label='User Name'
                  />
                </div>                  
              </div>
            </Grid>
            <Grid xs={12}>
              <div className="pt-1 flexrow justify-content-center">
                <div style={{minWidth: _minInputWidth, maxWidth:_maxInputWidth}}>
                  <TextField
                    required={true}
                    fullWidth={true}
                    // size='medium'
                    autoComplete={false}
                    placeholder='Please enter email'
                    label='Email'
                    id='email'
                    name='email'
                    value={email}
                    type='email'
                    onChange={e => onChange(e)}
                  />
                </div>                  
              </div>
            </Grid>
            <Grid xs={12}>
              <div className="pt-1 flexrow justify-content-center">
                  <div style={{minWidth: _minInputWidth, maxWidth:_maxInputWidth}}>

                    <TextField
                      placeholder='Enter Password'
                      label='Password'
                      required
                      id='password'
                      name='password'
                      value={password}
                      type='password'
                      onChange={e => onChange(e)}
                      // variant='outlined'
                      fullWidth={true}
                    />
                  </div>
              </div>
            </Grid>
            <Grid xs={12}>
              <div className="pt-1 flexrow justify-content-center">
                <div style={{minWidth: _minInputWidth, maxWidth:_maxInputWidth}}>
                  <TextField
                    placeholder='Confirm Password'
                    label='Confirm Password'
                    required
                    id='confirmPassword'
                    name='confirmPassword'
                    value={confirmPassword}
                    type='password'
                    onChange={e => onChange(e)}
                    // variant='outlined'
                    fullWidth={true}
                  />
                </div>
              </div>
            </Grid>
            <Grid xs={12}>
              <div className="pt-4 flexrow justify-content-center">
                <div style={{minWidth: _minInputWidth, maxWidth:_maxInputWidth}}>
                  <Button
                    color='secondary'
                    fullWidth={true}
                    variant='contained'
                    type='submit'
                  >
                    ADD EMPLOYEE
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>

      </form>
    </Container>
  );
}

export  default AddEmployeePage;
