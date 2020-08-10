import React from 'react'

const newServiceItem = ({service, addToOrder}) => {
  const { _id, productName, serviceType, servicePrice } = service;

  return (
    <tr>
      <td>{`${productName} ${serviceType}`}</td>
      <td className='right-align'>{`$${servicePrice.toFixed(2)}`}</td>
      <td className='center-align'>
        <a
          onClick={e => addToOrder(service)}
          className='btn-floating small waves-effect waves-light btn-small blue'
        >
          <i className='material-icons small'>add</i>
        </a>
      </td>
    </tr>
  );
};

export default newServiceItem
