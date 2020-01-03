import React from 'react'

const ServiceRowInOrderForm = ({service}) => {
  const { quantity, unitPrice, unitServiceStatus, unitTotalPrice } = service
  const {productName, serviceType } = service.service
  console.log(service);
  return (
    <tr>
      <td>{`${productName} ${serviceType}`}</td>
      <td>{unitPrice}</td>
      <td>{quantity}</td>
      <td>{unitServiceStatus}</td>
      <td>{unitTotalPrice}</td>
    </tr>
  )
}
export default ServiceRowInOrderForm
