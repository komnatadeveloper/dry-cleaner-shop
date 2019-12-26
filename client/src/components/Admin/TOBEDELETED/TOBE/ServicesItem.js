import React from 'react'

const ServicesItem = ({
  service
}) => {

  const { _id, product, productName, serviceType, servicePrice } = service

  return (
    <tr>
      <td>{productName}</td>
      <td>{serviceType}</td>
      <td>{servicePrice}</td>
      <td>{product}</td>
      <td>
        <a className='waves-effect waves-light btn-small blue lighten-2 '>
          Settings
        </a>
      </td>
    </tr>
  );
}

export default ServicesItem
