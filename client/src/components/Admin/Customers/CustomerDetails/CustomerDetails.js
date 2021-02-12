import React, {useContext, useEffect, useState} from 'react';
import adminContext from '../../../../context/admin/adminContext'
import {
  Container,
  CircularProgress,
  Button,
  Grid,
  TextField
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { ActivitiesTable } from './ActivitiesTable';



const CustomerDetails =   ({match}) => {
  const adminContext1 = useContext(adminContext)
  const {  updateCustomer, addNewCustomer, loadSingleCustomer, loadSingleCustomerActivities } = adminContext1;
  const [ _loading,  _setLoading] = useState(false);

  const [ _willShowActivities, _setWillShowActivities ] = useState(false);
  const [ _customerActivities, _setCustomerActivities ] = useState( [] );
  const _cbLoadSingleCustomerActivities = ( res ) => {
    console.log('admin/customers/customerDetails -> _cbLoadSingleCustomerActivities -> res -> ', res);
    _setCustomerActivities(res);
  }


  const [formData, setFormData] = useState({
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

  const updateFormFromBackend = (res) => {
    let balance;
    if ( res.balance === 0 ) {
      balance= res.balance.toFixed(2);
    } else if (res.balance ) {
      balance = res.balance.toFixed(2);
    } else if ( !res.balance ) {
      balance = res.user.balance.toFixed(2);
    }
    setFormData({
      ...formData,
      name: res.name || (res.user && res.user.name ) || "",
      middleName: res.middleName ||(res.user && res.user.middleName ) || "",
      surName: res.surName || (res.user && res.user.surName ) || "",
      username: res.username || (res.user && res.user.username ) || "",
      email: res.email || (res.user && res.user.email ) || "",
      tel1: res.tel1 || (res.user && res.user.tel1) || "",
      tel2: res.tel2 ||  (res.user && res.user.tel2 )|| "",
      address: res.address ||  (res.user && res.user.address )|| "",
      // balance: res.balance || "",
      balance: balance || "",
    });
  }



  useEffect( () => {
    // If Edit
    if(match.params.id) {
      _setLoading(true);
      loadSingleCustomer(match.params.id)
        .then(res => {            
          updateFormFromBackend(res);
          _setLoading(false);
        })
    }
  }, []);

  const {    
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



  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault()
    // If Update
    if (match.params.id) {
      updateCustomer({ formData, id: match.params.id })
        .then(res => {
          updateFormFromBackend(res);
      });
    } else {

      // If New Customer
      addNewCustomer({
        formData,
        cb: updateFormFromBackend
      });
    }

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
            _loading 
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
                  {match.params.id ? (
                    <h2 className='text-center mt-3 mb-2'>{`${username} Info`}</h2>
                  ) : (
                    <h2 className='text-center mt-3 mb-2'>Add Customer</h2>
                  )}
                  <Grid container spacing={3}>
                    {!match.params.id && (
                      <Grid
                        xs={12}
                      >                  
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
                      </Grid>
                    )}
                  
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
                          disabled={match.params.id ? true : false}
                          id='email'
                          type='text'
                          autoComplete={false}
                          name='email'
                          value={email}
                          onChange={e => onChange(e)}
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
                          value={`$${balance}`}
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
          {
            _willShowActivities && (
              <>
                <div className='text-center mb-1 mt-4'>
                  <h3>Customer Activities</h3>
                </div>
                <ActivitiesTable
                  activitiesList={_customerActivities}
                />

              </>
            )
          }
        </div>
        <div className='mb-2 flexrow'>
          <Button
            size='large'
            disabled={_loading}
            variant='contained'
            color='secondary'
            endIcon= {<SendIcon />}
            type='submit'
          >
            {match.params.id ? 'Update User' : 'Create User'}
          </Button>
          <div className="ml-1">
            <Button
              size='large'
              variant='contained'
              color='secondary'
              onClick={() => {
                _setWillShowActivities(true);
                loadSingleCustomerActivities({
                  customerId: match.params.id,
                  cb: _cbLoadSingleCustomerActivities

                });
              }}
            >
              View Activities
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
}

export default CustomerDetails
