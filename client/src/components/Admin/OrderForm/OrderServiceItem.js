import React from 'react'

const newServiceItem = ({service, addToOrder}) => {
  const { _id, productName, serviceType, servicePrice } = service;

  return (
    <tr>
      <td>{`${productName} ${serviceType}`}</td>
      <td>{servicePrice}</td>
      <td>
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
