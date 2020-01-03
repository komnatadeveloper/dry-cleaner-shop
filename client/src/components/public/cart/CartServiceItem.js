import React, {useContext} from 'react'
import publicContext from '../../../context/public/publicContext'


const CartServiceItem = ({item}) => {
  const publicContext1 = useContext(publicContext)
  const {changeItemQuantity} = publicContext1


  return (
    <tr>
      <td>{`${item.productName} ${item.serviceType}`}</td>
      <td>{`$${item.unitPrice}`}</td>
      <td>
        {/* keyboard_arrow_left
        keyboard_arrow_right */}
        <a
          href='#!'
          onClick={e => {
            e.preventDefault()
            changeItemQuantity({ serviceId: item.service, process: "minusOne" })}
          }
          className='waves-effect waves-light'
        >
          <i className='material-icons red-text'>keyboard_arrow_left</i>
        </a>
        {item.quantity}
        <a
          href='#!'
          onClick={e => {
            e.preventDefault();
            changeItemQuantity({ serviceId: item.service, process: "plusOne" })}
          }
          className='waves-effect waves-light'
        >
          <i className='material-icons  red-text'>keyboard_arrow_right</i>
        </a>
      </td>
      <td>{item.unitTotalPrice}</td>
      <td>
        <a
          href='#!'
          onClick={e => {
            e.preventDefault();
            changeItemQuantity({ serviceId: item.service, process: "delete" })}
          }
          className='waves-effect waves-light'
        >
          <i style={{ color: "grey" }} className='material-icons'>
            delete_forever
          </i>
        </a>
      </td>
    </tr>
  );
}

export default CartServiceItem
