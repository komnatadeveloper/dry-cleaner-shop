import React, {useEffect, useContext, Fragment } from 'react'
import OrdersItem from './OrdersItem'
import Spinner from '../../layout/Spinner'
import userContext from '../../../context/user/userContext'

const UserMain = () => {
  const userContext1 = useContext(userContext)
  const { loadOrders, orders, loading } = userContext1

  useEffect(() => {
    // eslint-disable-next-line
    loadOrders()
    // eslint-disable-next-line
  }, [])

  return (

    <Fragment>
      {loading ? (
        <Spinner></Spinner>
      ) : (
          <div id='admin-clothes-tab'>
            <div>
              {/* <Link
                to='/dashboard/orders/add'
                className='waves-effect waves-light btn blue lighten-2 mt-1 ml-1'
              >
                Order <i className='material-icons small'>add</i>
              </Link> */}
            </div>
            <table>
              <thead>
                <tr>
                  <th>Order Date</th>
                  <th className='pr-2 right-align'>Order Total</th>
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
          </div>
        )}
    </Fragment>

  )
}

export default  UserMain
