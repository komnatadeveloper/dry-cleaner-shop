import React, {useEffect} from "react";
import{ Link } from 'react-router-dom'
import Moment from "react-moment"

const OrdersItem = ({ order }) => {

  useEffect(() => {

  }, [order])

  const {
    _id,
    user,
    date,
    orderStatus,
    orderTotalPrice
  } = order;



  return (
    <tr>
      <td>
        <Moment format='YYYY-MM-DD HH:mm'>{date}</Moment>
      </td>
      <td>{user.username}</td>
      {/* <td>{orderStatus}</td> */}
      <td className='right-align'>{orderTotalPrice.toFixed(2)}</td>
      <td className='center-align'>
        <span className='badge red center-align'>{orderStatus}</span>
      </td>
      <td>
        {/* <a class="waves-effect waves-light grey darken-1 btn-small mr-1">Edit</a> */}
        <Link
          to={`/dashboard/orders/edit/${_id}`}
          className='waves-effect waves-light btn-small grey darken-1 '
        >
          <i className='material-icons small'>edit</i>
        </Link>
      </td>
    </tr>
  );
};

export default OrdersItem;
