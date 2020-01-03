import React, {useContext,useEffect} from 'react'
import publicContext from '../../../context/public/publicContext'
import userContext from '../../../context/user/userContext'
import CartServiceItem from './CartServiceItem'


const Cart = ({history}) => {
  const publicContext1 = useContext(publicContext)
  const { cart, setCart,  } = publicContext1

  const userContext1 = useContext(userContext)
  const { addToOrderFromCart  } = userContext1


  useEffect(() => {
    // eslint-disable-next-line
    if(!cart) {
      const cartFromLocal = localStorage.getItem('cart')
      if (cartFromLocal) {
        // eslint-disable-next-line
        setCart({type:'json', cart: cartFromLocal})
      }
    }
    // eslint-disable-next-line
  }, [])

  const handleOnclick = e => {
    // If Signed in as a user, then add as an order and go to orders page
    addToOrderFromCart({ formData: cart, history})   
  }




  return (
    <div>
      <div id="customer-shopping-cart" className="mt-2">
        <table className="striped highlight">
          <thead>
            <tr>
              <th>Service</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
              {/* ITEMS IN CART */}
            {cart && cart.serviceList&& cart.serviceList.length > 0 && cart.serviceList.map( item => (
                <CartServiceItem 
                  key= {item.service}
                  item = {item}
                />

              )
                
              )}
              {/* END OF ITEMS IN CART */}
          </tbody>
        </table>
        <div className="flexrow justify-content-flex-end">
          <div className="col s12 m4">
            <h4>Cart Totals</h4>
            <div className="flexrow justify-content-space-between">
              <p>Total: </p>
              <p>{`$${cart && cart.orderTotalPrice }`}</p>
            </div>
            <a
              href="#!"
              onClick={ (e) =>{
                e.preventDefault()                
                handleOnclick(e)}}
              className="waves-effect waves-light btn-large"
            ><i className="material-icons right">send</i>Checkout</a>
          </div>
        </div>
      </div>  
      <button onClick={e => console.log(cart)}>BASS</button>    
    </div>
  )
}

export  default Cart
