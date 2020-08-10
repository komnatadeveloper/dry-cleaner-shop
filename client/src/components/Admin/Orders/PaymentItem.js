import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment"

const PaymentItem = ({ payment }) => {
  useEffect(() => {}, [payment]);

  const { _id, customerId, date, amount } = payment;

  return (
    <tr>
      <td>
        <Moment format='YYYY-MM-DD HH:mm'>{date}</Moment>
      </td>
      <td>{customerId.username}</td>
      {/* <td>{orderStatus}</td> */}
      <td className='font-weight-bold right-align pr-2'>{((-1) * amount).toFixed(2)}</td>
      <td className='center-align'> 
        {/* <a class="waves-effect waves-light grey darken-1 btn-small mr-1">Edit</a> */}
        <Link
          to={`/dashboard/payments/edit/${_id}`}
          className='waves-effect waves-light btn-small grey darken-1 '
        >
          <i className='material-icons small'>edit</i>
        </Link>
      </td>
    </tr>
  );
};

export default PaymentItem;
