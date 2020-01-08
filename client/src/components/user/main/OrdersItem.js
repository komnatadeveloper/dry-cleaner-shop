import React, { useEffect } from "react";
import { Link } from "react-router-dom";

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

  return (
    <tr>
      <td>{date}</td>
      {/* <td>{user.username}</td> */}
      {/* <td>{orderStatus}</td> */}
      <td>{orderTotalPrice}</td>
      <td>
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
