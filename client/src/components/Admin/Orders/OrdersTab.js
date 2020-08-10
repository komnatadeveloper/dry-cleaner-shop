import React, {useContext, useEffect, Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import OrdersItem from './OrdersItem'
import PaymentItem from './PaymentItem'

import Spinner from '../../layout/Spinner'
import adminContext from '../../../context/admin/adminContext'
import M from 'materialize-css'

const OrdersTab = () => {
  const adminContext1 = useContext(adminContext)
  const { loadOrders, orders, loading, loadPayments, payments} = adminContext1

  const [selectChoice, setSelectChoice] = useState("orders"); 



  useEffect(() => {
    // eslint-disable-next-line
    M.AutoInit()
    // eslint-disable-next-line
    loadOrders()
    // eslint-disable-next-line
    loadPayments()
    // eslint-disable-next-line
  }, [])
  
  return (
    <Fragment>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div id='admin-clothes-tab'>
          <div 
            style={{
              display:'flex',
              flexDirection:'row',
              alignItems:'center'
            }}
          >
            <div
              style={{ maxWidth: "110px", display: "inline-block" }}
              className='input-field ml-1'
            >
              <select
                onChange={e => {
                  setSelectChoice(e.target.value);
                  console.log("HELLO FROM SELECT");
                  console.log(selectChoice);
                  console.log(e.target.value);
                }}
                className='browser-default'
              >
                <option value='orders' selected>
                  Orders
                </option>
                <option value='payments'>Payments</option>
              </select>
              {/* <label>Materialize Select</label> */}
            </div>
            <Link
              to='/dashboard/orders/add'
              className='waves-effect waves-light btn blue lighten-2  ml-1'
              style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center'
              }}
            >
              <p>Order</p>
              <i className='material-icons small'>add</i>
            </Link>
            <Link
              to='/dashboard/payments/add-payment'
              className='waves-effect waves-light btn blue lighten-2  ml-1'
              style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center'
              }}
            >
              <p>Payment</p>
              <i className='material-icons small'>payment</i>
            </Link>
          </div>
          {/* If Orders Are Selected */}
          {selectChoice === "orders" && (
            <table>
              <thead>
                <tr>
                  <th>
                    Order Date
                  </th>
                  <th>Username</th>
                  <th className='right-align'>Price</th>
                  <th className='center-align'>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders ? (
                  orders.length > 0 &&
                  orders.map(order => (
                    <OrdersItem key={order._id} order={order} />
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          )}
          {/* If Payments Are Selected */}
          {selectChoice === "payments" && (
            <table>
              <thead>
                <tr>
                  <th>Payment Date</th>
                  <th>Username</th>
                  <th className='right-align'>Quantity</th>
                  <th className='center-align'>Actions</th>
                </tr>
              </thead>

              <tbody>
                {payments ? (
                  payments.length > 0 &&
                  payments.map(payment => (
                    <PaymentItem key={payment._id} payment={payment} />
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </Fragment>
  );
}

export default OrdersTab
