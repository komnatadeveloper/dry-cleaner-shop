import React, { useReducer } from "react";
import axios from "axios";
import publicContext from "./publicContext";
import publicReducer from "./publicReducer";

import {
  GET_SERVICES_AND_CATEGORIES,
  PUBLIC_ERROR,
  SET_PUBLIC_LOADING,
  ADD_TO_CART,
  SET_CART
} from "../types";

const PublicState = props => {
  const initialState = {
    publicServices: [],
    publicCategories: [],
    cart: null,
    loading: true
  }; // End of initialState 

  const [state, dispatch] = useReducer(publicReducer, initialState);

  const setPublicLoading = status => {
    dispatch({
      type: SET_PUBLIC_LOADING,
      payload: status
    });
  }

  const getServicesAndCategories = async () => {
    setPublicLoading(true)      
    try {
      const res = await axios.get("/api/public/services-and-categories");
      dispatch({
        type: GET_SERVICES_AND_CATEGORIES,
        payload: res.data
      });
    } catch (err) {
      dispatch( {
        type: PUBLIC_ERROR,
        payload: err.response.msg
      })
    }
    setPublicLoading(false);  
  }


  //---------------------------- CART BEGIN------------------
  const addToCart = ({service}) => {
    let cart = localStorage.getItem('cart')

    if (!cart) { // there is no cart before
      
      cart = {orderTotalPrice: service.servicePrice,
        serviceList: [
          {
            service: service._id,
            quantity: 1,
            unitPrice: service.servicePrice,
            unitTotalPrice: service.servicePrice,
            productName: service.productName,
            serviceType: service.serviceType
          }
        ]}
      localStorage.setItem("cart", JSON.stringify({...cart }))

    } else { // cart has already been created
      cart = JSON.parse(cart)
     
      cart.orderTotalPrice += service.servicePrice;

      // check if that service exists on list
      const index = cart.serviceList.findIndex( item => item.service === service._id )
      if(index >= 0 ) {
        cart.serviceList[index].quantity += 1;
        cart.serviceList[index].unitTotalPrice += service.servicePrice;
      } else {
        cart.serviceList.push( {
          service: service._id,
          quantity: 1,
          unitPrice: service.servicePrice,
          unitTotalPrice: service.servicePrice,
          productName: service.productName,
          serviceType: service.serviceType
        })
      }
      localStorage.setItem("cart", JSON.stringify({ ...cart }))
    }
    dispatch({
      type: ADD_TO_CART,
      payload: cart
    })
  }


  const setCart = ({type, cart}) => {
    // console.log(cart)
    if( type === 'json') {
      // console.log(cart);
      const parsed = JSON.parse(cart)
      dispatch({
        type: SET_CART,
        payload: {...parsed}
      })
    }
    if(type === 'js') {
      dispatch({
        type: SET_CART,
        payload: {...cart}
      })
    }
  }


  const setCartDirectly = (cart) => {
    console.log(cart)
    dispatch({
      type: SET_CART,
      payload: cart
    })
  }
  

  const handleCartCalculations = (cart) => {
    let orderTotalPrice = 0;
    let deleteIndex = -1;
    // eslint-disable-next-line
    cart.serviceList.map( (item, index) => {
      item.unitTotalPrice = item.quantity * item.unitPrice;
      orderTotalPrice += item.unitTotalPrice
      if(item.quantity === 0)  {
        deleteIndex = index
      }
    })
    if(deleteIndex !== -1) {
      cart.serviceList.splice(deleteIndex, 1)
    }
    cart.orderTotalPrice = orderTotalPrice 
  }


  // Change Item Quantities at Cart
  const changeItemQuantity = ({serviceId, process, value=false }) => { 
    // minusOne, plusOne, delete,  setValue
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) 
    // eslint-disable-next-line
    let cart = new Object({ ...cartFromLocalStorage})   
    
    // find Index of service
    const index = cart.serviceList.findIndex( item => item.service === serviceId )

    switch (process) {
      case 'minusOne':
        cart.serviceList[index].quantity += -1;
        break;
      case 'plusOne':
        cart.serviceList[index].quantity += 1;
        break;
      case 'delete':
        cart.serviceList[index].quantity = 0;
        break;
      case 'setValue':
        const setValue = parseInt(value)
        if(setValue === 'NaN') {
          cart.serviceList[index].quantity = 1;
          
        } else {
          cart.serviceList[index].quantity = setValue;           
        }
        break;
      default:
        // cart.serviceList[index].quantity = cart.serviceList[index].quantity;
        return
    }
    handleCartCalculations(cart)

    setCart({ type: 'js', cart})
    localStorage.setItem("cart", JSON.stringify(cart))
  }

    //---------------------------- END of CART------------------

  return (
    <publicContext.Provider
      value={{
        loading: state.loading,
        cart: state.cart,
        publicServices: state.publicServices,
        publicCategories: state.publicCategories,
        addToCart,
        setCart,
        setCartDirectly,
        getServicesAndCategories,
        setPublicLoading,
        changeItemQuantity
      }}
    >
      {props.children}
    </publicContext.Provider>
  );
};

export default PublicState