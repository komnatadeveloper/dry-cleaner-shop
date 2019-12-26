import React, {useEffect, useContext } from 'react'
import adminContext from '../../../../context/admin/adminContext'
import  ServicesItem from './ServicesItem'

const ServicesTab = () => {

  const adminContext1 = useContext(adminContext)
  const { loadServices, services } = adminContext1

  useEffect(() => {
    loadServices()
  }, [])

  const servicesRow = (clothesType, serviceType, price, serviceDuration, quantity,  status) => {
    return (
      <tr>
        <td>{clothesType}</td>
        <td>{serviceType}</td>
        <td>{price}</td>
        <td>{serviceDuration}</td>
        <td>
          <a className="waves-effect waves-light btn-small blue lighten-2 ">Settings</a>
        </td>
      </tr>
    )
  }

  return (
    <div id="admin-clothes-tab">
      <table >
        <thead>
          <tr>
            <th>Product</th>
            <th>Service</th>
            <th>Price</th>
            <th>Duration</th>
            {/* Buttons */}
            <th>Options</th>
          </tr>
        </thead>

        <tbody>
          { services.length > 0 ? 
            services.map( service => <ServicesItem
              key = {service._id}
              service = {service}
              />) :
            <></>}

        </tbody>
      </table>
    </div>
  )
}

export default ServicesTab
