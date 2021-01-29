import React, { useEffect, useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import adminContext from '../../../context/admin/adminContext';

const CustomersItem = (
 {customer}
) => {
  const adminContext1 = useContext(adminContext)
  const { deleteCustomer  } = adminContext1;

  const [isDeletingCustomer, setIsDeletingCustomer ] = useState(false);
  const _cbDeleteCustomer = anyData => setIsDeletingCustomer(false);

  useEffect(() => {
      console.log(customer);
    }, [customer]
  );


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
        {
          isDeletingCustomer 
          ? (
              <>Deleting...</>
            )
          : (
            <>
              <a className='waves-effect waves-light grey darken-1 btn-small mr-1'>
                Edit
              </a>
              <a 
                className='waves-effect waves-light red darken-1 btn-small mr-1'
                onClick={e => {
                  e.preventDefault();
                  setIsDeletingCustomer(true);
                  deleteCustomer({
                    id: _id,
                    cb: _cbDeleteCustomer
                  });
                }}
              >
                Delete
              </a>
              <Link to={`/dashboard/customers/edit/${_id}`} className='waves-effect waves-light grey darken-1 btn-small mr-1'>
                Details
              </Link>
            </>
          )
        }
      </td>
    </tr>
  );
};

export default CustomersItem