import React from 'react';

const ServiceRowInOrderForm = ({service}) => {
  const { quantity, unitPrice, unitServiceStatus, unitTotalPrice } = service;
  const {productName, serviceType } = service.service;
  return (
    <tr>
      <td className='pl-2'>{`${productName} ${serviceType}`}</td>
      <td className='right-align pr-3'>${unitPrice.toFixed(2)}</td>
      <td className='right-align pr-4'>{quantity}</td>
      <td className='center-align'>{unitServiceStatus}</td>
      <td className='right-align pr-3'>${unitTotalPrice.toFixed(2)}</td>
    </tr>
  )
}
export default ServiceRowInOrderForm
