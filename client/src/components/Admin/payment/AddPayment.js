import React, {useContext, useState, Fragment, useEffect} from 'react'
import adminContext from '../../../context/admin/adminContext'
import PaymentUserItem from './PaymentUserItem'
import {
  Container,
  CircularProgress,
  TextField,
  InputAdornment,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Grid
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const AddPayment = ({match, history}) => {
  const [activityId, setActivityId ] = useState(match.params.activityId || null);
  const [_loading, _setLoading] = useState( match.params.activityId !== undefined );
  const adminContext1 = useContext(adminContext)
  const {
    loadQueriedUsers,
    userQuery,
    clearUserQuery,
    addPayment,
    getSingleUserActivity,
    updatePayment
  } = adminContext1;

  const initialState = {
    customerId: "",
    username: "",
    balance: "",
    fullName: "",
    payment: ""
  };

  const [formData, setFormData] = useState({ ...initialState });
  const [selectedUserInfo, setSelectedUserInfo] = useState({});
  const [search, setSearched] = useState("");


  // If editting a payment, next callback func
  const next = (res) => {
    // So it can not be loaded
    if(res === null) {
      return history.push('/dashboard');
    }
    const { 
      customerId, // _id , username, email, name, middleName, surName, balance
      amount, 
      date  
    } = res;
    setSelectedUserInfo({...customerId});
    setFormData({
      _id: activityId,
      customerId: customerId._id,
      username: customerId.username,
      fullName: [customerId.name, customerId.middleName, customerId.surName]
        .join(" ")
        .trim(),
      payment: ((parseFloat(amount.toString()))*(-1)).toFixed(2)
    });
    _setLoading(false);
  }

  useEffect(() => {
    // If Editting a Payment
    if(activityId) {
      getSingleUserActivity({activityId, next})
    }
  }, []);










  const selectUser = ({userInfo}) => {
  const { username, _id, name, middleName, surName, balance } = userInfo;


    setFormData({
    ...formData,
    customerId: _id,
    username: username,
    fullName : [name, middleName, surName].join(" ").trim(),
    balance,
    });
    setSelectedUserInfo({...userInfo});

    // clearUserQuery()
    setQueriedUsersList([]);
    setSearched("");
  }

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange =  () => {
    let payment = parseFloat(formData.payment).toFixed(2)

    if(payment === 'NaN') payment = ''

    setFormData({
      ...formData,
      payment
    });
  };


  const [ queriedUsersList, setQueriedUsersList ] = useState( [] );
  const _cbSetQueriedUsersList = ( arr ) => {
    setQueriedUsersList(arr);
  }
  const handleSearchChange = e => {
    setFormData({...initialState});
    setSelectedUserInfo({});
    setSearched(e.target.value);
    loadQueriedUsers(
      e.target.value,
      _cbSetQueriedUsersList
    );
  }

  const submitPayment = (e) => {
    if(!activityId) {

      addPayment({formData: {
        customerId: formData.customerId,
        payment: parseFloat(payment)
      }})

    } else { // Edit Existing Payment Option
      // Mutating the formData, as soon as useractivity model has a different structure
      updatePayment({
        formData: {
        _id: formData._id,
        customerId: formData.customerId,
        amount: parseFloat(formData.payment) * (-1)
      }, next: (res) => {
        if(res) {
          setFormData({...initialState});
          history.push('/dashboard');
        }

      }})
    }    
  }

  const { username, fullName, balance, payment} = formData

  

  

  return (
    <Container
      maxWidth='lg'
      style={{
        backgroundColor:'#ccc',
        paddingTop: 64,
        minHeight:'90vh'
      }}      
    >
      <div 
        className='flexcol justify-content-space-between'
        style={{
          minHeight:'90vh'
        }}
      >
        <div>
          <h2 className='text-center mt-3 mb-1'>
           {activityId ? 'Update Payment for Customers' :  'Add Payment For Customers'}
          </h2>
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
                <>
                  {/* Search Bar for Users */}          
                  <form autoComplete='off'>            
                    <TextField
                      required={true}
                      fullWidth={true}
                      placeholder='Search for Customers'
                      id='search'
                      name='search'
                      value={search}
                      size='medium'
                      type='search'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <SearchIcon />
                          </InputAdornment>
                        )
                      }}
                      autoComplete={false}
                      onChange={e => handleSearchChange(e)}
                      label='Customer'
                    />
                  </form>
                  {/* End of Search Bar for Users */}
                  {/* User List from API */}
                  {queriedUsersList && queriedUsersList.length > 0 && (
                    <Fragment>
                      <span className='flexrow justify-content-flex-start'>
                        <div className='row mp-0'></div>
                      </span>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Username</TableCell>
                              <TableCell>{'Name & Surname'}</TableCell>
                              <TableCell>Balance</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {queriedUsersList &&
                              queriedUsersList.map(userItem => (
                                <PaymentUserItem
                                  key={userItem._id}
                                  userInfo={userItem}
                                  selectUser={selectUser}
                                />
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Fragment>
                  )}
                  {/* End of User List from API */}

                  {/* User And Balance Info for Selected User */}
                  {selectedUserInfo.username && (
                    <Fragment>
                      <h3 className='text-center mt-4'>User Information</h3>
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
                            value={selectedUserInfo.username}
                            label='User Name'
                          />
                        </Grid>
                        <Grid  xs={12} md={4}>
                          <div className='mx-1 mt-1'>
                            <TextField
                              placeholder='Enter name'
                              disabled={true}
                              fullWidth={true}
                              type='text'
                              autoComplete={false}
                              value={selectedUserInfo.name}
                              onChange={e => onChange(e)}
                              label='Name'
                            />
                          </div>
                        </Grid>
                        <Grid  xs={12} md={4}>
                          <div className='mx-1 mt-1'>
                            <TextField
                              placeholder='Middlename'
                              fullWidth={true}
                              disabled={true}
                              type='text'
                              autoComplete={false}
                              value={selectedUserInfo.middleName ? selectedUserInfo.middleName : ''}
                              label='Middlename'
                            />
                          </div>
                        </Grid>
                        <Grid  xs={12} md={4}>
                          <div className='mx-1 mt-1'>
                            <TextField
                              fullWidth={true}
                              disabled={true}
                              type='text'
                              autoComplete={false}
                              value={selectedUserInfo.surName ? selectedUserInfo.surName : ''}
                              label='Surname'
                            />
                          </div>
                        </Grid>
                        <Grid
                          xs={12}
                        >
                          <div className='mt-1'>
                            <TextField
                              disabled={true}
                              fullWidth={true}
                              size='medium'
                              type='email'
                              autoComplete={false}
                              value={selectedUserInfo.email}
                              label='Email'
                            />
                          </div>
                        </Grid>
                        <Grid
                          xs={12}
                        >
                          <div className='mt-1'>
                            <TextField
                              disabled={true}
                              fullWidth={true}
                              size='medium'
                              type='text'
                              autoComplete={false}
                              value={ parseFloat(selectedUserInfo.balance.toString()).toFixed(2) }
                              label='Balance'
                            />
                          </div>
                        </Grid> 
                        <Grid
                          xs={12}
                        >
                          <h4 className='text-center w-100 mb-2 mt-2'>Payment Quantity</h4>  
                        </Grid>
                        <Grid
                          xs={12}
                        >
                          <div className='mt-1'>
                            <TextField
                              required={true}
                              fullWidth={true}
                              placeholder='Enter Payment Quantity'
                              id='payment'
                              name='payment'
                              value={payment}
                              size='medium'
                              type='search'
                              autoComplete={false}
                              onChange={e => onChange(e)}
                              onBlur={() => handlePaymentChange()}
                              label='Payment'
                              prefix={<SearchIcon />}
                            />
                          </div>
                        </Grid> 
                      </Grid>
                    </Fragment>
                  )}
                  {/* End of User And Balance Info for Selected User */}
                </>
              )
          }
        </div>
        <div className='mb-2 mt-2'>
          <Button
            onClick={e => submitPayment(e)}
            disabled={!selectedUserInfo.username}
            type='submit'
            color='secondary'
            variant='contained'
          >
            {activityId ? 'Update Payment' : 'Submit Payment'}
          </Button>
        </div>
      </div>
    </Container>
  );
}

export  default AddPayment
