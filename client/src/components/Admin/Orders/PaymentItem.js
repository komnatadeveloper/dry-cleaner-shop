import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const PaymentItem = ({ payment }) => {
  useEffect(() => {}, [payment]);

  const { _id, customerId, date, amount } = payment;

  return (
    <tr>
      <td>{date}</td>
      <td>{customerId.username}</td>
      {/* <td>{orderStatus}</td> */}
      <td>{amount}</td>
      <td>
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
