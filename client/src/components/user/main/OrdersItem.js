import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from 'react-moment';

const OrdersItem = ({ order }) => {
  useEffect(() => {}, [order]);

  const {
    _id,
    // eslint-disable-next-line
    user,
    date,
    // eslint-disable-next-line
    serviceList,
    orderStatus,
    orderTotalPrice
  } = order;

  let calculatedTotalPrice = 0;
  if( !orderTotalPrice ) {
    for( let i = 0; i < serviceList.length; i++ ) {
      calculatedTotalPrice += serviceList[i].unitTotalPrice;  
    }
  }

  return (
    <tr>
      <td>
        <Moment format='YYYY-MM-DD HH:mm'>{date}</Moment>
      </td>
      {/* <td>{user.username}</td> */}
      {/* <td>{orderStatus}</td> */}
      <td className='right-align pr-2'>
        {
          orderTotalPrice 
            ? orderTotalPrice.toFixed(2)
            : calculatedTotalPrice.toFixed(2)
        }
      </td>
      <td className='center-align'>
        <span className='badge red'>{orderStatus}</span>
      </td>
      <td>
        {/* <a class="waves-effect waves-light grey darken-1 btn-small mr-1">Edit</a> */}
        <Link
          to={`/user-main/orders/${_id}`}
          className='waves-effect waves-light btn-small grey darken-1 '
        >
          <i className='material-icons small'>edit</i>
        </Link>
      </td>
    </tr>
  );
};

export default OrdersItem;
