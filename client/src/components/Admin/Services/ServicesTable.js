import React, {Fragment, useContext} from 'react'
import ServiceItemsInRows from './ServiceItemsInRows'
import admincontext from '../../../context/admin/adminContext'
import adminContext from '../../../context/admin/adminContext'

const ServicesTable = ({services }) => {
  
  const adminContext1 = useContext(admincontext)
  const { deleteService} = adminContext1
  
  
  
  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Service</th>
            <th>Price</th>
            <th className="center-align">Featured</th>
            <th style={{textAlign:'center'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services ? (
            services.map(service => (
              <ServiceItemsInRows 
                key={service._id} 
                serviceInfo={service} 
                deleteService={deleteService}
              />
            ))
          ) : (
            <Fragment></Fragment>
          )}
        </tbody>
      </table>
    </Fragment>
      )
  
}

export  default ServicesTable
