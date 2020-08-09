import React, { useEffect} from 'react'
import {Link} from 'react-router-dom'


const CustomersItem = (
 {customer}
) => {

  useEffect(() => {

    console.log(customer);
  }, [customer])


  const {
    _id,
    name,
    // eslint-disable-next-line
    middleName,
    surName,
    username,
    // eslint-disable-next-line
    email,
    balance,
    // eslint-disable-next-line
    address
  } = customer;

  const fullName = ([name, surName].join(' ')).trim()


  return (
    <tr>
      <td>{fullName}</td>
      <td>{username}</td>
      {/* <td>{totalOrders}</td> */}
      <td className='right-align'>
        {balance.toFixed(2)}
      </td>
      <td className='center-align'>
        <a className='waves-effect waves-light grey darken-1 btn-small mr-1'>
          Edit
        </a>
        <Link to={`/dashboard/customers/edit/${_id}`} className='waves-effect waves-light grey darken-1 btn-small mr-1'>
          Details
        </Link>
      </td>
    </tr>
  );
};

export default CustomersItem