import React, { useReducer, useContext } from "react";
import axios from "axios";
import userContext from "./userContext";
import userReducer from "./userReducer";
import alertContext from "../alert/alertContext";
import publicContext from '../../context/public/publicContext'

import {
  USER_ORDER_FORM_SUBMITTED,
  SET_USER_LOADING,
  USER_ORDERS_LOADED
} from "../types";

const UserState = props => {
  const initialState = {
    orders: [],
    loading: true
    

  }; // initialState END-OF

  const alertContext1 = useContext(alertContext);
  const { setAlert } = alertContext1;

  const publicContext1 = useContext(publicContext);
  const { setCartDirectly } = publicContext1;

  const [state, dispatch] = useReducer(userReducer, initialState);


  //-----------------------LOADING------------------------------
  const setUserLoading = status => {
    dispatch({
      type: SET_USER_LOADING,
      payload: status
    });
  };


  const addToOrderFromCart = async ({formData, history}) => {
    // console.log(formData);
    setUserLoading(true)
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const res = await axios.post(`/api/users/orders`, formData, config);

      dispatch({
        type: USER_ORDER_FORM_SUBMITTED,
        payload: res.data.order
      });
      setUserLoading(false)

      setAlert(res.data.msg, "success", 3000);

      history.push('/user-main')

      // setCart({type: 'js',
      // cart:null})
      setCartDirectly({  cart: {cart:null}})
      localStorage.removeItem('cart')

    } catch (err) {
      console.log(err.response)
      console.log(err)
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => setAlert(error.msg, "danger", 2500));
      }
    }
  }

  // LOAD ORDERS
  const loadOrders = async () => {
    try {
      setUserLoading(true)

      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.get("/api/users/orders", config);

      // console.log('HELLO FROM LOAD ORDERS', res.data);

      // console.log(res.data);
      

      dispatch({
        type: USER_ORDERS_LOADED,
        payload: res.data
      });

      setUserLoading(false);

    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => setAlert(error.msg, "danger", 2500));
      }
    }
  }


  // Load Single Order
  const loadSingleOrder = async ({_id, next}) => {
    setUserLoading(true)
    try {

      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.get(`/api/users/orders/${_id}`, config); 

      next(res.data)
      
    } catch (err) {
      console.log(err.response);
      next(null)
      const errors = err.response.data.errors;
      
      if (errors) {
        errors.forEach(error => setAlert(error.msg, "danger", 2500));
      }
    }
    setUserLoading(false);
  }





  return (
    <userContext.Provider
      value={{
        addToOrderFromCart,
        loadOrders,
        loadSingleOrder,
        orders: state.orders,
        loading: state.loading
        

      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;