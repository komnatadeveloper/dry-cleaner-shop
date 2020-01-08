import React, {Fragment, useContext, useState,  useEffect} from 'react'
import userContext from '../../../context/user/userContext'
import ServiceFormInOrderForm from './ServiceRowInOrderForm'
import Spinner from '../../layout/Spinner'
import Moment from 'react-moment'

const SingleOrder = ({match, history}) => {
  
  const userContext1 = useContext(userContext)
  const { loadSingleOrder,  loading } = userContext1

  const [formData, setFormData] = useState( {
    _id: '',
    user: '',
    serviceList: [],
    orderStatus: '',
    orderTotalPrice: '',
    date: ''
  })

  const next = (singleOrder) => { 
    if (!singleOrder) return  history.push("/user-main")
    setFormData({
      _id : singleOrder._id,
      user : singleOrder.user,
      serviceList : singleOrder.serviceList,
      orderStatus : singleOrder.orderStatus,
      orderTotalPrice : singleOrder.orderTotalPrice,
      date : singleOrder.date
    })
  }
  useEffect(() => {
    loadSingleOrder({ _id: match.params._id, next })
  }, [])
  

  const { _id, user, serviceList, orderStatus, orderTotalPrice, date } = formData





  if( loading) return <Spinner></Spinner>
  return (
    <Fragment>
      <a
        onClick={e => history.push("/user-main")}
        className='waves-effect waves-light btn-small grey darken-1 mt-1 mb-1 ml-1'
      >
        Back to Orders
      </a>
      <div className='row mp-0'>
        <div className='flexrow justify-content-space-between'>
          <span>
            Order Date:
            <Moment format='YYYY-MM-DD HH:mm'>{date}</Moment>
          </span>
          <span>Order Status: {orderStatus}</span>
        </div>
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
          {serviceList.map(service => (
            <ServiceFormInOrderForm
              key={service.service._id}
              service={service}
            />
          ))}
        </tbody>
      </table>
      <button onClick={e => console.log(formData)}>BASS</button>
    </Fragment>
  );
}

export  default SingleOrder
