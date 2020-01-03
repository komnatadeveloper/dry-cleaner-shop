import React, {useContext, useEffect, Fragment, } from 'react'
import { Link } from 'react-router-dom'
import AddClothesModal from '../TOBEDELETED/TOBE/AddClothesModal';
import OrdersItem from './TOBE/OrdersItem'
import Spinner from '../../layout/Spinner'
import adminContext from '../../../context/admin/adminContext'
import CustomersItem from '../Customers/CustomersItem';

const OrdersTab = () => {
  const adminContext1 = useContext(adminContext)
  const { loadOrders, orders, loading } = adminContext1



  useEffect(() => {
    if( orders.length === 0) {
      loadOrders()
    }

  }, [])

  // const clothesRow = (orderId, username, quantity, price, status) => {
  //   return (
  //     <tr>
  //       <td>{orderId}</td>
  //       <td>{username}</td>
  //       <td>{quantity}</td>
  //       <td>{price}</td>
  //       <td><span className="badge red">{status}</span></td>
  //       <td>
  //         {/* <a class="waves-effect waves-light grey darken-1 btn-small mr-1">Edit</a> */}
  //         <a className="waves-effect waves-light btn-small blue lighten-2 ">Details</a>
  //       </td>
  //     </tr>
  //   )
  // }
  return (
    <Fragment>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div id='admin-clothes-tab'>
          <div>
            <Link
              to='/dashboard/orders/add'
              className='waves-effect waves-light btn blue lighten-2 mt-1 ml-1'
            >
              Order <i className='material-icons small'>add</i>
            </Link>
          </div>
          <AddClothesModal />
          <table>
            <thead>
              <tr>
                <th>Order Date</th>
                <th>Username</th>
                {/* <th>Quantity</th> */}
                <th>Price</th>
                <th>Status</th>
                {/* Buttons */}
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

              {/* {clothesRow('dsere45rw', 'usernameOz', 6, '$54.45', 'Process' )}
          {clothesRow('dsere45rw', 'usernameOz', 6, '$54.45', 'Process' )}
          {clothesRow('dsere45rw', 'usernameOz', 6, '$54.45', 'Process' )}
          {clothesRow('dsere45rw', 'usernameOz', 6, '$54.45', 'Process' )}
          {clothesRow('dsere45rw', 'usernameOz', 6, '$54.45', 'Process' )}
          {clothesRow('dsere45rw', 'usernameOz', 6, '$54.45', 'Process' )}           */}
            </tbody>
          </table>
        </div>
      )}
    </Fragment>
  );
}

export default OrdersTab
