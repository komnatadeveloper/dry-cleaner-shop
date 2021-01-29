import React, { useContext, useState, useEffect, Fragment } from 'react';
import adminContext from '../../../context/admin/adminContext'
import OrderServiceItem from './OrderServiceItem'
import OrderUserItem from './OrderUserItem'
import ServiceItemInOrders from './ServiceItemInOrders';
import Spinner from '../../layout/Spinner'
import alertContext from '../../../context/alert/alertContext';




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
    debugger;
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
    const newList = orderData.serviceList;
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
      return setAlert('Please Select Customer', "danger");   
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







  if (loading) return <Spinner></Spinner>
  return (
    <Fragment>
      <div className='row'></div>
      <div className='row'>  
        {/* Order Form */}
        <div
          className={sectionSelection === "none" ? "col m9 s12" : "col m8 s12"}
        >
          <div id='new-order-orders' className='z-depth-2'>
            <div id='new-order-orders-table'>
              <div 
                id='upper-row' 
                className='row'
              >
                <span 
                  style={{ marginLeft: "1rem" }} 
                  // className='col s12 m6 flexrow justify-content-center'
                  className='input-field'
                  >
                    User: 
                    {/* {orderData.user.username ? orderData.user.username : ""} */}
                  {" "}
                  <i className='material-icons prefix'>search</i>
                  <input
                    type='search'
                    label='User'
                    value={orderData.username}
                    placeholder='Search for Users'
                    style={{
                      display:'inline-block',
                      width: 240
                    }}
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
                </span>
              </div>
              {
                queriedUsersList.length > 0 && (
                  <table>
                    <tr>
                      <th>Username</th>
                      <th>Name</th>
                      <th>Middle</th>
                      <th>Surname</th>
                      <th>Balance</th>
                    </tr>
                    {
                      queriedUsersList.map( userItem => (
                          <tr
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
                            <td>{userItem.username}</td>
                            <td>{userItem.name}</td>
                            <td>{userItem.middleName}</td>
                            <td>{userItem.surName}</td>
                            <td>{userItem.balance.toFixed(2)}</td>
                          </tr>
                        )
                      )
                    }
                  </table>
                )
              }

              <table>
                <thead>
                  <tr>
                    <th className='service-column'>Service</th>
                    <th className='price-column'>Price</th>
                    <th className='quantity-column'>Quantity</th>
                    <th className='status-column center-align'>Status</th>
                    <th className='total-price-column right-align' style={{ paddingRight: '1rem' }}>Tot. Price</th>
                  </tr>
                </thead>
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
              </table>              
              <div className="row">
                <input
                  type='text'
                  label='Search Service'
                  placeholder='Search for Services'
                  value={serviceSearchText}
                  style={{
                    display:'inline-block',
                    width: 280
                  }}
                  onChange= { e => {
                    setServiceSearchText( e.target.value );
                    loadQueriedServices(
                      e.target.value,
                      _cbSetQueriedServicesList
                    );
                  }}
                />
              </div>
              {
                queriedServicesList.length > 0 && queriedServicesList.map(  serviceItem => (
                    <tr 
                      key={serviceItem._id}
                      onClick={ () => {
                        console.log('service Item Click -> serviceItem -> ', serviceItem);
                        addToOrder({...serviceItem});
                        setQueriedServicesList([]);
                        setServiceSearchText('');
                      }}
                    >
                      <td>{serviceItem.serviceName}</td>
                      <td>{serviceItem.servicePrice}</td>
                    </tr>
                  )
                )
              }
            </div>
            <div className='row'>
              {/* <span className="col s6 m9"></span> */}
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
            </div>
            <div className='row'>
              {/* <span className="col s6 m9"></span> */}
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
            </div>
            <div className='row flexrow justify-content-flex-end'>
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
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
}

export default NewOrder
