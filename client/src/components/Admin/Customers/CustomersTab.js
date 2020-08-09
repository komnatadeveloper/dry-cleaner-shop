import React, {useContext, useEffect, Fragment } from 'react'
import { Link} from 'react-router-dom'
import AddCustomerModal from './AddCustomerModal';
import adminContext from '../../../context/admin/adminContext'
import CustomersItem from './CustomersItem'
import Spinner from '../../layout/Spinner'


const CustomersTab = () => {
  const adminContext1 = useContext(adminContext)
  const { loadCustomers, customers, loading } = adminContext1;

  useEffect(() => {
    if (customers.length === 0) {
      loadCustomers();
      console.log('HELLO FROM LOAD CUSTOMERS');
    }
  }, [])
  

  

  // const addCustomer = () => {
    
  //   const btn = <button data-target="modalCustomer" className="btn modal-trigger" />
  //   console.log('clicked add customer')  
    
     
  // }
    
  

  return (
    <div id='admin-customers-tab'>
      <div>
        <Link
          className='waves-effect waves-teal blue btn-flat modal-trigger ml-2 mt-2'
          to='/dashboard/customers/add'
          // onClick={() => addCustomer()}
        >
          ADD CUSTOMER
          <i className='material-icons right'>add</i>
        </Link>
      </div>
      {/* <AddCustomerModal /> */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            {/* <th>Total Orders</th> */}
            <th className='right-align'>Balance</th>
            {/* Buttons */}
            <th className='center-align'>Options</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <Spinner></Spinner>
          ) : (customers ? (
            customers.map(customer => (
              <CustomersItem key={customer._id} customer={customer} />
            ))
          ) : (
            <Fragment></Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomersTab


          // {
          //   customers ? (
          //     customers.map(customer => (
          //       <CustomersItem key={customer._id} customer={customer} />
          //     ))
          //   ) : (
          //     <Fragment></Fragment>
          //   );
          // }
