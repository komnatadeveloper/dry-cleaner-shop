import React, {useContext, useState, useEffect, Fragment} from 'react';
import adminContext from '../../../context/admin/adminContext'
import OrderServiceItem from './OrderServiceItem'
import OrderUserItem from './OrderUserItem'
import ServiceItemInOrders from './ServiceItemInOrders';
import Spinner from '../../layout/Spinner'





const NewOrder = ({match, history}) => {
  // If Edit
  const orderId = match.params.orderId || null;

  const adminContext1 = useContext(adminContext)
  const {
    loadQueriedServices,
    serviceQuery,
    loadServiceStatuses,
    serviceStatuses,
    loadQueriedUsers,
    userQuery,
    clearUserQuery,
    submitNewOrder,
    loadSingleOrder,
    updateOrder,
    loading
  } = adminContext1;
  const [orderData, setOrderData] = useState( {
    user: {
      id: "",
      username: ""
    },
    serviceList: [],
    orderStatus: '',
    orderTotalPrice: 0
  })

  const [sectionSelection, setSectionSelection ] = useState('none')

  // If Edit
  const next = res => {
    
    if(!res) {
      return history.push('/dashboard/orders')
    }
    setOrderData({
      ...orderData,
      _id: res._id,
      user: {
        _id: res.user._id,
        username: res.user.username
      },
      serviceList: res.serviceList.map(item => {


        const mapped = {
          service: item.service._id,      // service id OR productId
          productName: item.service.productName,
          serviceType: item.service.serviceType,
          unitPrice:  item.unitPrice,
          quantity: item.quantity,
          unitServiceStatus: item.unitServiceStatus,
          unitTotalPrice: item.unitTotalPrice
        }

        // const prev = new Object({item})
        // const mapped = {
        //   service: prev.service.id,
        //   productName: prev.service.productName,
        //   serviceType: prev.service.serviceType 
        // }
        return mapped
      } ),
      orderTotalPrice: res.orderTotalPrice,
      orderStatus: res.orderStatus
    });
  }

  useEffect(() => {
    if(!orderId) {
      loadServiceStatuses()
    }    

    // If not a new order, we are editting order
    if(orderId) {
      loadSingleOrder({orderId, next})
    }

  }, [])

  const statusList = serviceStatuses.map( status => ({
    servStatus: status.servStatus,
    description: status.description
  }))



  // serviceList[
  //   {
  //     service: "5df55f1fcac13bc2d8220c01",
  //     productName: "Pants",
  //     quantity: 10,
  //     unitPrice: 10,
  //     unitServiceStatus: "In Progress",
  //     serviceType: "Iron",
  //     servicePrice: 14.05
  //   }
  // ]; 




  const addToOrder = service => {
    
    const newList = orderData.serviceList;

    const { productName, _id, serviceType, servicePrice } = service;

    // Create a new Order Element
    const newService = new Object({
      service: _id,
      productName,
      serviceType, // not to DB
      quantity: 1,
      unitPrice: servicePrice,
      unitServiceStatus: statusList[0].servStatus
    });

    // Check if that service already in order list
    const indexNum = newList.findIndex( item => item.service === newService.service)

    // update List according to existence
    if(indexNum >= 0) {
      newList[indexNum].quantity += 1;
    } else {
      newList.push(newService);
    }

    setOrderData({
      ...orderData,
      serviceList: newList
    });

    orderMutate()

  }  // End of AddToOrder
  

  // Iterate List, and Set Order Status and Prices
  const orderMutate = () => {
    const newList = orderData.serviceList;
    let orderTotal = 0;
    let orderStatus = "Ready";
    newList.map(item => {
      item.unitTotalPrice = item.unitPrice * item.quantity;
      orderTotal += item.unitTotalPrice;

      if (item.unitServiceStatus !== "Ready"){ 
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

  // Select User
    const selectUser = ({userInfo}) => {
      const { username, _id } = userInfo;
      const selectedUser = new Object({
        username, _id
      })       

    setOrderData({
      ...orderData,
      user: selectedUser
    });

    // Close Users Opening Dynamic Section
    setSectionSelection('none')
    clearUserQuery()

  }  // End of Select User


  // Calculate unit total Price and Order Total Price
  const calculatePrice = () => {
    const newList = orderData.serviceList; 
    let orderTotal = 0;
    newList.map( item => {
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
    setOrderData( {
    ...orderData,
    orderStatus,
    });      
  }



  // Change Quantity
  const changeQuantity = ( {service, newValue} ) => {
    const newList = orderData.serviceList;    
    const indexNum = newList.findIndex( item => item.service === service)
    newList[indexNum].quantity = parseInt(newValue)
    setOrderData({
      ...orderData,
      serviceList: newList
    });
    setOrderStatus()
    calculatePrice()
  }  // End of changeQuantity


  // Set Service Status
  const setServiceStatus = ({service, selectValue}) => {

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

    if(! orderId) {
      // If New Order
      submitNewOrder({ formData: orderData });
    } else {
      updateOrder({ formData: orderData, orderId });
    }
  }


    
    


  
  if(loading) return <Spinner></Spinner>
  return (
    <Fragment>
      <div className='row'></div>
      <div className='row'>
        {/* Dynamic Services Section */}
        {sectionSelection === "services" && (
          <div className='col s12 m4'>
            <div id='new-order-services'>
              {/* Search Bar for Orders */}
              <form autoComplete='off'>
                <div className='input-field'>
                  <i className='material-icons prefix'>search</i>
                  <input
                    id='search'
                    type='search'
                    onChange={e => loadQueriedServices(e.target.value)}
                    name='search'
                    placeholder='Search for Services'
                  />
                  <label className='label-icon' htmlFor='search'></label>
                  <i className='material-icons'>close</i>
                </div>
              </form>
              {/* End of Search Bar for Orders */}
              {/* Service List from DB */}
              <table>
                <thead>
                  <tr>
                    <th>Service Name</th>
                    <th>Price</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceQuery &&
                    serviceQuery.map(service => (
                      <OrderServiceItem
                        key={service._id}
                        service={service}
                        addToOrder={addToOrder}
                      />
                    ))}
                </tbody>
              </table>
              {/* End of Service List from DB */}
            </div>
          </div>
        )}
        {/* End of Dynamic Services Section */}

        {/* Dynamic Users Section */}
        {sectionSelection === "users" ? (
          <div className='col s12 m4'>
            <div id='new-order-users'>
              {/* Search Bar for Users */}
              <form autoComplete='off'>
                <div className='input-field'>
                  <i className='material-icons prefix'>search</i>
                  <input
                    id='search'
                    type='search'
                    onChange={e => loadQueriedUsers(e.target.value)}
                    name='search'
                    placeholder='Search for Customers'
                  />
                  <label className='label-icon' htmlFor='search'></label>
                  <i className='material-icons'>close</i>
                </div>
              </form>
              {/* End of Search Bar for Users */}
              {/* User List from DB */}
              <table>
                <thead>
                  <tr>
                    <th>username</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {userQuery &&
                    userQuery.map(user => (
                      <OrderUserItem
                        key={user._id}
                        userInfo={user}
                        selectUser={selectUser}
                      />
                    ))}
                </tbody>
              </table>
              {/* End of User List from DB */}
            </div>
          </div>
        ) : (
          <Fragment></Fragment>
        )}
        {/* End of Dynamic Users Section */}

        {/* Order Form */}
        <div
          className={sectionSelection === "none" ? "col m9 s12" : "col m8 s12"}
        >
          <div id='new-order-orders' className='z-depth-2'>
            <div id='new-order-orders-table'>
              <div id='upper-row' className='row'>
                <span style={{ marginLeft: "1rem" }} className='col s12 m6'>
                  User: {orderData.user.username ? orderData.user.username : ""}
                  {" ......... "}
                  {/* User Select or Update Button */}{" "}
                  <a
                    className='btn-small  waves-effect waves-light grey darken-1'
                    // type='button'
                    onClick={e => {
                      if (sectionSelection !== "users") {
                        setSectionSelection("users");
                      } else {
                        setSectionSelection("none");
                      }
                    }}
                  >
                    <i class='material-icons small'>edit</i>
                  </a>
                  {/* End of User Select or Update Button */}
                </span>
              </div>

              <table>
                <thead>
                  <tr>
                    <th className='service-column'>Service</th>
                    <th className='price-column'>Price</th>
                    <th className='quantity-column'>Quantity</th>
                    <th className='status-column'>Status</th>
                    <th className='total-price-column'>Tot. Price</th>
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
                      ${orderData.orderTotalPrice}
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
            <div className='row'>
              <span className='col s7 m9 l10'>
                {/* Open Services Section Button */}
                <button
                  style={{ marginLeft: "1rem" }}
                  className='btn waves-effect waves-light grey darken-1'
                  type='button'
                  onClick={e => {
                    if (sectionSelection !== "services") {
                      setSectionSelection("services");
                    } else {
                      setSectionSelection("none");
                    }
                  }}
                >
                  {sectionSelection !== "services" ? (
                    <Fragment>
                      Services
                      <i class='material-icons right '>add</i>
                    </Fragment>
                  ) : (
                    <Fragment>
                      Services
                      <i class='material-icons right '>close</i>
                    </Fragment>
                  )}
                </button>
                {/* End of Open Services Section Button */}
              </span>
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
