import React from 'react'
import CustomersTab from '../Customers/CustomersTab'
import OrdersTab from './OrdersTab'
import ServicesTab from './TOBE/ServicesTab'




const AdminTabs = () => {
  return (
    <div>
      <div className='row'>
        <div className='col s12'>
          <ul className='tabs'>
            <li className='tab col s2'>
              <a href='#customersTab'>Customers</a>
            </li>
            {/* <li class="tab col s3"><a class="active" href="#clothesTab">Clothes</a></li> */}
            <li className='tab col s2'>
              <a href='#ordersTab'>Orders</a>
            </li>
            <li className='tab col s2'>
              <a href='#servicesTab'>Services</a>
            </li>
          </ul>
        </div>
        <div id='customersTab' className='col s12'>
          <CustomersTab />
        </div>
        <div id='ordersTab' className='col s12'>
          <OrdersTab />
        </div>
        <div id='servicesTab' className='col s12'>
          <ServicesTab />
        </div>
      </div>
    </div>
  );
}

export default AdminTabs
