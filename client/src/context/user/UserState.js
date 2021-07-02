import React, { useReducer, useContext } from "react";
import axios from "axios";
import userContext from "./userContext";
import userReducer from "./userReducer";

// Other Contexts
import alertContext from "../alert/alertContext";
import authContext from "../auth/authContext";
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

  const _authContext = useContext(authContext);
  const { handleAuthError } = _authContext;

  const [state, dispatch] = useReducer(userReducer, initialState);


  const _handleResponseError = err => {
    if (err.request.status === 401)  handleAuthError();
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => setAlert(error.msg, "error", 2500));
    }
  }


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
      setCartDirectly( null );
      localStorage.removeItem('cart')

    } catch (err) {
      return _handleResponseError(err);
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
      dispatch({
        type: USER_ORDERS_LOADED,
        payload: res.data
      });

      setUserLoading(false);

    } catch (err) {
      return _handleResponseError(err);
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
      // console.log(err.response);
      next(null)
      _handleResponseError(err);
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