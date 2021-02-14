import React, { useContext, useState, useEffect, Fragment } from 'react';
import adminContext from '../../../context/admin/adminContext'
import ServiceItemInOrders from './ServiceItemInOrders';
import alertContext from '../../../context/alert/alertContext';
import {
  Container,
  Button,
  Grid,
  TextField,
  InputAdornment,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';
import {  withStyles, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';


const NewOrder = ({ match, history }) => {
  // If Edit
  const [orderId, setOrderID ] = useState(match.params.orderId || null);
  const _cbSetOrderId = ( id ) => setOrderID(id);


  const adminContext1 = useContext(adminContext)
  const {
    loadQueriedServices,
    loadServiceStatuses,
    serviceStatuses,
    loadQueriedUsers,
    submitNewOrder,
    loadSingleOrder,
    updateOrder,
    loading
  } = adminContext1;
  const alertContext1 =  useContext(alertContext);
  const { 
    setAlert
  } = alertContext1;
  const [orderData, setOrderData] = useState({
    user: '', // userID => will be SENT TO API
    username: '',  // NOT TO SEND TO API (for UI)
    serviceList: [],
    orderStatus: '',
    orderTotalPrice: 0
  })

  const [sectionSelection, setSectionSelection] = useState('none')
  const [userObject, setUserObject] = useState( {} );
  const [ queriedUsersList, setQueriedUsersList ] = useState( [] );
  const _cbSetQueriedUsersList = ( arr ) => {
    setQueriedUsersList(arr);
  }
  const [serviceSearchText, setServiceSearchText] = useState('');
  const [ queriedServicesList, setQueriedServicesList ] = useState( [] );
  const _cbSetQueriedServicesList = ( arr ) => {
    setQueriedServicesList(arr);
  }
  

  // If Edit
  const next = res => {
    if (!res) {
      return history.push('/dashboard/orders')
    }
    setOrderData({
      ...orderData,
      _id: res._id,
      // user: {
      //   _id: res.user._id,
      //   username: res.user.username
      // },
      user: res.user._id,
      username: res.user.username,
      serviceList: res.serviceList.map(item => {
        const mapped = {
          service: item.service._id,      // service id OR productId
          productName: item.service.productName,
          serviceName: item.service.serviceName,
          serviceType: item.service.serviceType,
          unitPrice: item.unitPrice,
          quantity: item.quantity,
          unitServiceStatus: item.unitServiceStatus,
          unitTotalPrice: item.unitTotalPrice
        }
        return mapped
      }),
      orderTotalPrice: res.orderTotalPrice,
      orderStatus: res.orderStatus
    });
    setUserObject({...res.user})
  }

  useEffect(() => {
    if (!orderId) {
      loadServiceStatuses()
    }
    // If not a new order, we are editting order
    if (orderId) {
      loadSingleOrder({ orderId, next })
    }
  }, [])

  const statusList = serviceStatuses.map(status => ({
    servStatus: status.servStatus,
    description: status.description
  }))


  const addToOrder = service => {
    const newList = orderData.serviceList;
    const { 
      _id,
      serviceName,
      servicePrice,
    } = service;
    // Create a new Order Element
    const newService = new Object({
      service: _id,
      serviceName,
      quantity: 1,
      unitPrice: servicePrice,
      unitServiceStatus: statusList[0].servStatus
    });
    // Check if that service already in order list
    const indexNum = newList.findIndex(item => item.service === newService.service)
    // update List according to existence
    if (indexNum >= 0) {
      newList[indexNum].quantity += 1;
    } else {
      newList.push(newService);
    }
    setOrderData({
      ...orderData,
      serviceList: newList
    });
    orderMutate();  
  }  // End of AddToOrder


  // Iterate List, and Set Order Status and Prices
  const orderMutate = () => {
    const newList = orderData.serviceList;
    let orderTotal = 0;
    let orderStatus = "Ready";
    newList.map(item => {
      item.unitTotalPrice = item.unitPrice * item.quantity;
      orderTotal += item.unitTotalPrice;

      if (item.unitServiceStatus !== "Ready") {
        orderStatus = "In Progress";
      }
    });

    setOrderData({
      ...orderData,
      orderTotalPrice: orderTotal,
      serviceList: newList,
      orderStatus
    });
  }

  


  // Calculate unit total Price and Order Total Price
  const calculatePrice = () => {
    const newList = orderData.serviceList;
    let orderTotal = 0;
    newList.map(item => {
      item.unitTotalPrice = item.unitPrice * item.quantity
      orderTotal += item.unitTotalPrice
    })

    setOrderData({
      ...orderData,
      orderTotalPrice: orderTotal,
      serviceList: newList
    });

  }


  const setOrderStatus = () => {
    const newList = orderData.serviceList;
    let orderStatus = 'Ready';
    newList.map(item => {
      if (item.unitServiceStatus !== 'Ready')
        orderStatus = 'In Progress';
    });
    setOrderData({
      ...orderData,
      orderStatus,
    });
  }



  // Change Quantity
  const changeQuantity = ({ service, newValue }) => {
    const newList = orderData.serviceList;
    const indexNum = newList.findIndex(item => item.service === service)
    newList[indexNum].quantity = parseInt(newValue)
    setOrderData({
      ...orderData,
      serviceList: newList
    });
    setOrderStatus()
    calculatePrice()
  }  // End of changeQuantity


  // Set Service Status
  const setServiceStatus = ({ service, selectValue }) => {
    console.log(selectValue);
    const newList = [...orderData.serviceList];
    const indexNum = newList.findIndex(item => item.service === service);
    newList[indexNum].unitServiceStatus = selectValue;
    setOrderData({
      ...orderData,
      serviceList: newList
    });
    setOrderStatus()
  }


  const handleSubmit = (e) => {
    if ( !userObject._id ) {
      return setAlert('Please Select Customer', "error");   
    }
    if (!orderId) {
      // If New Order
      submitNewOrder({ 
        formData: orderData,
        cb: _cbSetOrderId
      });
    } else {
      updateOrder({ formData: orderData, orderId });
    }
  }

  const useStyles = makeStyles({
    table: {
      minWidth: 700
    }
  });
  const classes = useStyles();
  const StyledTableCell = withStyles( theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);







  // if (loading) return <Spinner></Spinner>
  return (
    <Container
      maxWidth='lg'
      style={{
        backgroundColor:'#ccc',
        // paddingTop: 64,
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
          <div className="text-center mb-2 mt-2"> 
            <h2>{orderId ? 'Edit Order' : 'Add Order'}</h2>
          </div>  
          <Grid container spacing={3}>
            <Grid
              xs={12}
            >                  
              <div className="mb-2">
                <TextField
                  // id='categoryName'
                  // name='categoryName'
                  value={orderData.username}
                  placeholder='Search User'
                  label='User'
                  InputProps={{
                  startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                  // required={true}
                  fullWidth={true}
                  size='medium'
                  type='search'
                  autoComplete={false}
                  onChange= { e => {
                    setOrderData({
                      ...orderData,
                      user: '',
                      username: e.target.value
                    });
                    setUserObject({});
                    loadQueriedUsers( 
                      e.target.value,
                      _cbSetQueriedUsersList
                    );                      
                  }}
                />
                {
                  queriedUsersList.length > 0 && (
                    <TableContainer>
                      <Table>                      
                        <TableRow>
                          <TableCell>Username</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Middle</TableCell>
                          <TableCell>Surname</TableCell>
                          <TableCell>Balance</TableCell>
                        </TableRow>
                        {
                          queriedUsersList.map( userItem => (
                              <TableRow
                                key={userItem._id}
                                onClick= { () => {
                                  const tempUser = userItem;
                                  setUserObject({...tempUser});
                                  setOrderData({
                                    ...orderData,
                                    user: tempUser._id,
                                    username: tempUser.username
                                  });
                                  setQueriedUsersList([]);
                                }}
                              >
                                <TableCell>{userItem.username}</TableCell>
                                <TableCell>{userItem.name}</TableCell>
                                <TableCell>{userItem.middleName}</TableCell>
                                <TableCell>{userItem.surName}</TableCell>
                                <TableCell>{userItem.balance.toFixed(2)}</TableCell>
                              </TableRow>
                            )
                          )
                        }
                      </Table>
                    </TableContainer>
                  )
                }
              </div>
            </Grid>
            <Grid xs={12}>
              <TableContainer component={Paper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell >Service</StyledTableCell>
                      <StyledTableCell>Price</StyledTableCell>
                      <StyledTableCell align='center'>Quantity</StyledTableCell>
                      <StyledTableCell align='center'>Status</StyledTableCell>
                      <StyledTableCell align='right' style={{ paddingRight: '1rem' }}>Tot. Price</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <tbody id='services-list'>
                    {orderData.serviceList.map(service => (
                      <ServiceItemInOrders
                        key={service.service}
                        service={service}
                        changeQuantity={changeQuantity}
                        statusList={statusList}
                        setServiceStatus={setServiceStatus}
                      />
                    ))}
                  </tbody>
                </Table>
              </TableContainer> 
            </Grid>
            <Grid xs={12}>
              <div className="mb-2 mt-3">
                <TextField
                  // id='categoryName'
                  // name='categoryName'
                  value={serviceSearchText}
                  placeholder='Search for Services'
                  label='Search Service'
                  InputProps={{
                  startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                  // required={true}
                  fullWidth={true}
                  size='medium'
                  type='search'
                  autoComplete={false}
                  onChange= { e => {
                    setServiceSearchText( e.target.value );
                    loadQueriedServices(
                      e.target.value,
                      _cbSetQueriedServicesList
                    );
                  }}
                />
                {
                  queriedServicesList.length > 0 && queriedServicesList.map(  serviceItem => (
                      <TableRow 
                        key={serviceItem._id}
                        onClick={ () => {
                          console.log('service Item Click -> serviceItem -> ', serviceItem);
                          addToOrder({...serviceItem});
                          setQueriedServicesList([]);
                          setServiceSearchText('');
                        }}
                      >
                        <TableCell>{serviceItem.serviceName}</TableCell>
                        <TableCell>{serviceItem.servicePrice}</TableCell>
                      </TableRow>
                    )
                  )
                }
              </div>
            </Grid>
          </Grid>        
        </div>
        <div>
          {/* ------------------------------------------------ */}
          <div className='row'>
              {/* <span className="col s6 m9"></span> */}
              
            </div>
            <div className='row'>
              {/* <span className="col s6 m9"></span> */}
            </div>
            {/* <div className='row flexrow justify-content-flex-end'>
              <span className='col s5 m3 l2 '>
              <button
              style={{ marginRight: "2rem" }}
              id='order-submit-button'
              className='btn waves-effect waves-light align-items-flex-end'
                  type='button'
                  onClick={e => {
                    handleSubmit();
                  }}
                  >
                  Submit
                  <i className='material-icons right'>send</i>
                  </button>
                  </span>
                </div> */}
            <div className='flexrow justify-content-flex-end'>
              <ul>
                <li className='flexrow justify-content-space-between'>
                  <span>Total</span>
                  <span
                    style={{
                      fontWeight: "bold",
                      marginRight: "2rem",
                      marginLeft: "2rem"
                    }}
                  >
                    ${orderData.orderTotalPrice.toFixed(2)}
                  </span>
                </li>
              </ul>
            </div>
            <div className='flexrow justify-content-flex-end'>
              <ul>
                <li className='flexrow justify-content-space-between'>
                  <span>Order Status: </span>
                  <span
                    style={{
                      fontWeight: "bold",
                      marginRight: "2rem",
                      marginLeft: "2rem"
                    }}
                  >
                    {orderData.orderStatus}
                  </span>
                </li>
              </ul>
            </div>
            <div className='mb-2 mt-2'>
              <Button
                onClick={e => {
                  handleSubmit();
                }}
                color='secondary'
                variant='contained'
              >
                Submit
              </Button>
            </div>
          {/* ------------------------------------------------ */}
        </div>

      </div>
          


    </Container>
  );
}

export default NewOrder
