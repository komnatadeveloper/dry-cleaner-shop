import React, { useReducer, useContext } from "react";
import axios from "axios";
import authContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from '../../utils/setAuthToken'

import alertContext from '../alert/alertContext'

import {
  USER_LOGIN_SUCCESS,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  ADMIN_LOADED,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,  
  LOGOUT,
  SET_AUTH_LOADING,
  USER_UPDATED_SELF
} from "../types";


const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("auth")
      ? localStorage.getItem("auth").token
      : null,
    userType: localStorage.getItem("auth")
      ? localStorage.getItem("auth").userType
      : null,
    isAuthenticated: null,
    loading: true,
    user: null,

    error: null
  }; // initialState END-OF

  const alertContext1 = useContext(alertContext)
  const {setAlert} = alertContext1


  const [state, dispatch] = useReducer(authReducer, initialState);



  // ------------------------------------------GENERAL PURPOSE-----------------------------
  const handleAuthError = () => {
    console.log('HELLO FROM HANDLEAUTHERROR');
    dispatch({
      type: AUTH_ERROR
    });
  }


  // ------------------------------------------ADMIN-----------------------------

  // Load Admin
  const loadAdmin = async () => {

    if (localStorage.auth && JSON.parse(localStorage.auth).userType === 'Admin') {
      setAuthToken(localStorage.auth);
    }

    try {
      setAuthLoading(true)
      const res = await axios.get("/api/auth/admin");
      // console.log(res.data.admin);
      // console.log(res.data.userType);

      console.log(res.body);


      dispatch({
        type: ADMIN_LOADED,
        payload: res.data
      });



    } catch (err) {
      console.log('ADMIN LOAD ERROR');
      dispatch({ type: AUTH_ERROR });
    }
    setAuthLoading(false)
  };

  // Login Admin
  const adminLogin = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/auth/admin", JSON.stringify(formData), config);

      dispatch({
        type: ADMIN_LOGIN_SUCCESS,
        payload: res.data
      });

      dispatch(loadAdmin())
    } catch (err) {
      const errors = err.response.data.errors;


      if( errors ) {
        errors.forEach(error => setAlert(error.msg, "error"));
      }
      dispatch({
        type: ADMIN_LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };
  

  // ------------------------------------------USER-----------------------------

  // Load User
  const loadUser = async () => {
    if (localStorage.auth) {
      setAuthToken(localStorage.auth);
    }

    try {
      const res = await axios.get("/api/auth/users");

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });



    } catch (err) {
      
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Login User
  const userLogin = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/auth/users", JSON.stringify(formData), config);

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: res.data
      });

      dispatch(loadUser())
    } catch (err) {
      const errors = err.response.data.errors;


      if( errors ) {
        errors.forEach(error => setAlert(error.msg, "error"));
      }
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Register New User
  const userRegister = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      let updatedFormData = {
        name: formData.personName,
        ...formData
      };
      updatedFormData.personName = undefined;
      const res = await axios.post(
        "/api/users/register", // BE CAREFUL NOT <<auth>> BUT <<users>> ROUTER
        JSON.stringify(
          updatedFormData
        ), 
        config
      );
        
        // if( errors ) {
        //   errors.forEach(error => setAlert(error.msg, "danger"));
        // }
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: res.data
      });

      dispatch(loadUser())
    } catch (err) {
      const errors = err.response.data.errors;


      if( errors ) {
        errors.forEach(error => setAlert(error.msg, "error"));
      }
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  const userUpdateSelfAccount = async ({
    formData,
    cb  // callBack
  }) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      setAuthLoading(true);
      const res = await axios.put(
        "/api/users/account", // BE CAREFUL NOT <<auth>> BUT <<users>> ROUTER
        JSON.stringify(
          formData
        ), 
        config
      );
      dispatch({
        type: USER_UPDATED_SELF,
        payload: res.data.user
      });
      setAuthLoading(false);
      setAlert(res.data.msg, 'success', 3000);      
    } catch (err) {
      setAuthLoading(false);
      const errors = err.response.data.errors;
      if( errors ) {
        errors.forEach(error => setAlert(error.msg, "error"));
      }
    }
  }

  const userUpdateSelfPassword = async ({
    formData,
    cb  // callBack
  }) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post(
         "/api/users/update-pwd", // BE CAREFUL NOT <<auth>> BUT <<users>> ROUTER
        JSON.stringify(
          formData
        ), 
        config
      );
      if(cb) {
        cb();
      }
      setAlert(res.data.msg, 'success', 3000);      
    } catch (err) {
      if(cb) {
        cb();
      }
      const errors = err.response.data.errors;
      if( errors ) {
        errors.forEach(error => setAlert(error.msg, "error"));
      }
    }
  }
  

  const setAuthLoading =  (newStatus) => {
    dispatch({ 
      type: SET_AUTH_LOADING,
      payload: newStatus
    });
  }

  // BOTH For User and Admin
  const logout = () => {
    dispatch({ type: LOGOUT });
  }



  

  return (
    <authContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        userType: state.userType,
        error: state.error,
        // register,
        userLogin,
        userRegister,
        userUpdateSelfAccount,  // for customers to update their accounts
        userUpdateSelfPassword, // for customers to update password
        adminLogin,
        loadUser,
        loadAdmin,
        setAuthLoading,
        logout,  
        // clearErrors
        handleAuthError
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;