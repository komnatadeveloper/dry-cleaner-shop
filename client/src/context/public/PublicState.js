import React, { useReducer } from "react";
import axios from "axios";
import publicContext from "./publicContext";
import publicReducer from "./publicReducer";

import {
  GET_FEATURED_SERVICES,
  PUBLIC_ERROR,
  SET_PUBLIC_LOADING
} from "../types";

const ContactState = props => {
  const initialState = {
    featuredServices: [],
    loading: true,
    
    // contacts: null,
    // current: null,
    // filtered: null,
    // error: null
  }; // initialState sonu

  const [state, dispatch] = useReducer(publicReducer, initialState);

  const setPublicLoading = status => {
    dispatch({
      type: SET_PUBLIC_LOADING,
      payload: status
    });
  }

  const getFeaturedServices = async () => {
    try {
      setPublicLoading(true)      
      const res = await axios.get("/api/public/featured-services");
      
      console.log(res.data)
      dispatch({
        type: GET_FEATURED_SERVICES,
        payload: res.data
      });

      setPublicLoading(false);  
    } catch (err) {
      dispatch( {
        type: PUBLIC_ERROR,
        payload: err.response.msg
      })
    }
  }

  return (
    <publicContext.Provider
      value={{
        loading: state.loading,
        featuredServices: state.featuredServices,
        getFeaturedServices,
        setPublicLoading
      }}
    >
      {props.children}
    </publicContext.Provider>
  );
};

export default ContactState