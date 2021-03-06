import React, { useReducer, useContext } from "react";
import axios from "axios";
import adminContext from "./adminContext";
import adminReducer from "./adminReducer";
import alertContext from "../alert/alertContext";
import authContext from "../auth/authContext";

import {
  // Customers
  CUSTOMER_ADDED,
  CUSTOMER_UPDATED,
  CUSTOMER_DELETED,
  CUSTOMERS_LOADED,
  ORDERS_LOADED,
  PAYMENTS_LOADED,
  SERVICES_LOADED,
  SERVICE_ADDED,
  SERVICE_UPDATED,
  SINGLE_SERVICE_LOADED,
  CLEAR_QUERIED_SERVICES,
  SERVICE_STATUSES_LOADED,
  ORDER_FORM_SUBMITTED,
  PRODUCTS_INFO_LOADED,
  PRODUCT_ADDED,
  PRODUCT_UPDATED,
  QUERIED_PRODUCTS_LOADED,
  // Categories
  CATEGORIES_LOADED,
  CATEGORY_ADDED,
  CATEGORY_DELETED,
  PRODUCT_DELETED,
  SERVICE_DELETED,
  SINGLE_ORDER_LOADED,
  ORDER_FORM_UPDATED,
  SET_ADMIN_LOADING,
  CLEAR_QUERIED_USERS
} from "../types";

const AdminState = props => {
  const initialState = {
    customers: [],
    orders: [],
    categories: [],
    categoryQuery: [],
    services: [],
    serviceToBeEditted: null,
    serviceQuery: [],
    serviceStatuses: [],
    userQuery: [],
    products: [],
    productsQuery: [],
    loading: true,
    payments: []
  }; // initialState END-OF

  const alertContext1 = useContext(alertContext);
  const { setAlert } = alertContext1;

  const authContext1 = useContext(authContext);
  const { handleAuthError } = authContext1;

  

  const [state, dispatch] = useReducer(adminReducer, initialState);

  const _handleResponseError = err => {
    if (err.request.status === 401)  handleAuthError();
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => setAlert(error.msg, "error", 2500));
    }
  }


 //-----------------------LOADING------------------------------
    const setAdminLoading = status => {
      dispatch({
        type: SET_ADMIN_LOADING,
        payload: status
      });
    };


  //-----------------------PRODUCTS------------------------------

  const addProduct = async ({ formData }) => {
    if (!formData.image || !formData.name) {
      return;
    }
    const formData1 = new FormData();
    formData1.append("image", formData.image);
    formData1.append("name", formData.name);
    console.log(formData);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      const res = await axios.post(`/api/admin/products`, formData1, config);
      dispatch({
        type: PRODUCT_ADDED,
        payload: res.data.product
      });
      setAlert(res.data.msg, 'success', 3000)

    } catch (err) {
      return _handleResponseError(err);
    }
  };

  // Delete Product
  const deleteProduct = async (_id) => {    
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      const res = await axios.delete(`/api/admin/products/${_id}`,  config);
      console.log(res.data);
      dispatch({
        type: PRODUCT_DELETED,
        payload: res.data.product
      })

      setAlert(res.data.msg, "success", 3000);
    } catch (err) {
      return _handleResponseError(err);
    }
  };


  // Load Products WITHOUT Images
  const loadProductsWithoutImages = async () => {
    try {
      setAdminLoading(true)
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.get(`/api/admin/products/without-image`,  config);

      console.log(res.data);

      if (res.data) {
        dispatch({
          type: PRODUCTS_INFO_LOADED,
          payload: res.data
        });
      }
      setAdminLoading(false);
    } catch (err) {
      return _handleResponseError(err);
    }
  }

  // Update Product
  const updateProduct = async ({formData, _id}) => {

    const formData1 = new FormData()
    formData1.append('image', formData.image)
    formData1.append('name', formData.name)

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      const res = await axios.put(
        `/api/admin/products/${_id}`,
        formData1,
        config
      );

      dispatch({
        type: PRODUCT_UPDATED,
        payload: res.data.product
      });
      setAlert(res.data.msg, "success", 3000);
    } catch (err) {
      return _handleResponseError(err);
    }
  }


  const loadQueriedProducts = async searched => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      if (searched) {
        const res = await axios.get(
          `/api/admin/products/query?searched=${searched}`,
          config
        );

        // console.log(res.data);

        dispatch({
          type: QUERIED_PRODUCTS_LOADED,
          payload: res.data
        });
      } else {
        dispatch({
          type: CLEAR_QUERIED_SERVICES
        });
      }
    } catch (err) {
      return _handleResponseError(err);
    }
  };

  

  


  //-----------------------CATEGORIES------------------------------

  
  const addCategory = async ({ formData }) => {
    if (!formData.image || !formData.name) {
      return;
    }
    const formData1 = new FormData();
    formData1.append("image", formData.image);
    formData1.append("name", formData.name);
    console.log(formData);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      const res = await axios.post(
        `/api/admin/categories`, 
        formData1, 
        config
      );
      dispatch({
        type: CATEGORY_ADDED,
        payload: res.data.category
      });
      setAlert(res.data.msg, 'success', 3000)

    } catch (err) {
      return _handleResponseError(err);
    }
  };  // End of addCategory

  // Delete a Category
  const deleteCategory = async (_id, cb) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.delete(`/api/admin/categories/${_id}`, config);
      dispatch({
        type: CATEGORY_DELETED,
        payload: res.data.category
      });
      setAlert(res.data.msg, "success", 3000);
      if ( cb ){
        cb();
      }
    } catch (err) {
      if ( cb ) cb();      
      return _handleResponseError(err);
    }
  };  // End of Delete a Category


  // Load All Categories
  const loadCategories = async () => {
    try {
      setAdminLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };      
      const res = await axios.get("/api/admin/categories", config);
      // console.log(res.data);

      dispatch({
        type: CATEGORIES_LOADED,
        payload: res.data
      });
    } catch (err) {
      _handleResponseError(err);
    }
    setAdminLoading(false);
  }  // End of loadCategories


  // Query Categories
  const loadQueriedCategories = async (
    searched,
    cb
  ) => {
    try {    
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      if(searched){
        const res = await axios.get(`/api/admin/categories/query?searched=${searched}`, config);
        // console.log(res.data);
        return cb( res.data );  // queried categories list   
      } else {  
        return cb( [] );   
      } 
    } catch (err) {      
      cb ( [] );
      return _handleResponseError(err);
    }
  }  // End of loadQueriedCategories




  //-----------------------SERVICES------------------------------

  
  // Add a Service
  const addNewService = async ({ formData }) => {
    if (
      !formData.image 
      || !formData.category
      || !formData.serviceName
    ) {
      return;
    }    
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      const formData1 = new FormData();
      formData1.append("image", formData.image);
      formData1.append("serviceName", formData.serviceName);
      formData1.append("servicePrice", formData.servicePrice);
      formData1.append("category", formData.category);
      formData1.append("featured", formData.featured);

      const res = await axios.post(`/api/admin/services`, formData1, config);

      if (res.data) {
        dispatch({
          type: SERVICE_ADDED,
          payload: res.data.service
        });
      }
      setAlert(res.data.msg, "success", 3000);
    } catch (err) {
      return _handleResponseError(err);
    }
  };


  // Update a Service
  const updateService = async ({ formData, serviceId }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      const config2 = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const formData1 = new FormData();
      if ( formData.isImageUpdated ) {
        formData1.append("image", formData.image);
        formData1.append("isImageUpdated", formData.isImageUpdated);
        formData1.append("serviceName", formData.serviceName);
        formData1.append("servicePrice", formData.servicePrice);
        formData1.append("category", formData.category);
        formData1.append("featured", formData.featured);
      }
      let res; 
      if ( formData.isImageUpdated ) {
        res = await axios.put(`/api/admin/services/image-updated/${serviceId}`, formData1, config);
      } else {
        let formData2 = {...formData};
        formData2.image = undefined;
        res = await axios.put(`/api/admin/services/no-image-update/${serviceId}`, formData2, config2);
      }      
      dispatch({
        type: SERVICE_UPDATED,
        payload: res.data.service
      });
      setAlert(res.data.msg, "success", 3000);
    } catch (err) {
      return _handleResponseError(err);
    }
  };  // End of Update a Service
  
  

  // Delete a Service
  const deleteService = async (
    _id,
    cb  // callback
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.delete(`/api/admin/services/${_id}`, config);
      if(cb) { cb(); }
      dispatch({
        type: SERVICE_DELETED,
        payload: res.data.service
      });
      setAlert(res.data.msg, "success", 3000);      
    } catch (err) {
      if(cb) cb(); 
      return _handleResponseError(err);
    }
  };

  // Load All Services
  const loadServices = async () => {
    try {
    setAdminLoading(true)
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };      
      const res = await axios.get("/api/admin/services", config);
      // console.log(res.data);

      dispatch({
        type: SERVICES_LOADED,
        payload: res.data
      });
      setAdminLoading(false);
    } catch (err) {
      return _handleResponseError(err);
    }
  }

  // Load Service Statuses 
  const loadServiceStatuses = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.get(`/api/admin/service-status`, config);

      if (res.data) {
        dispatch({
          type: SERVICE_STATUSES_LOADED,
          payload: res.data
        });
      }
    } catch (err) {
      return _handleResponseError(err);
    }
  };

  // Load Single Service, this method will be synchronised to component Admin/Services/AddService.js by passing a parameter next method, so be careful when you decide to edit
  const loadSingleService = async ({serviceId, next}) => {
    setAdminLoading(true)
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };     
      const res = await axios.get(`/api/admin/services/info/${serviceId}`, config);

      next(res.data) // This is a method passing from component Admin/Services/AddService.js

      dispatch({
        type: SINGLE_SERVICE_LOADED,
        payload: res.data
      });
      
    } catch (err) {
      next(null)
      _handleResponseError(err);
    }
    setAdminLoading(false)
  }

  

  // Query Services
  const loadQueriedServices = async (
    searched,
    cb  // callBack Function
  ) => {
    try {    
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      if(searched){
        const res = await axios.get(`/api/admin/services/query?searched=${searched}`, config);
        // console.log(res.data);
        // dispatch({
        //   type: QUERIED_SERVICES_LOADED,
        //   payload: res.data
        // });
        cb(res.data);
      } else {
        // dispatch({
        //   type: CLEAR_QUERIED_SERVICES        
        // }); 
        cb( [] );    
      } 
    } catch (err) {
      return _handleResponseError(err);
    }
  }  // End of loadQueriedServices




  
  //-----------------------ORDERS---------------------------------
 
  // Submit New Order
  const submitNewOrder = async ({ 
    formData,
    cb
  }) => {
    // console.log(formData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.post(`/api/admin/orders`, formData, config);
      if ( cb ) {
        cb( res.data.order._id );
      }
      dispatch({
        type: ORDER_FORM_SUBMITTED,
        payload: res.data.order
      });
      setAlert(res.data.msg, "success", 3000);
    } catch (err) {
      return _handleResponseError(err);
    }
  };

  // Update  Order
  const updateOrder = async ({ formData, orderId }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.put(`/api/admin/orders/${orderId}`, formData, config);

      dispatch({
        type: ORDER_FORM_UPDATED,
        payload: res.data
      });

      setAlert(res.data.msg, "success", 3000);

    } catch (err) {
      return _handleResponseError(err);
    }
  };


  // Load Single Order
  const loadSingleOrder = async ({orderId, next}) => {
    setAdminLoading(true)
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };       
      await loadServiceStatuses();
      const res = await axios.get(`/api/admin/orders/${orderId}`, config);
      next(res.data);
      dispatch({
        type: SINGLE_ORDER_LOADED,
        payload: res.data
      });
      // return res.data

    } catch (err) {
      next(null)
      _handleResponseError(err);
    }
    setAdminLoading(false);
  }

  // Load Orders
  const loadOrders = async (
    cb // if there is callBack
  ) => {
    try {
      setAdminLoading(true);    
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };      
      const res = await axios.get("/api/admin/orders", config);
      dispatch({
        type: ORDERS_LOADED,
        payload: res.data
      });
      if ( cb ) { cb(); }
      setAdminLoading(false);
    } catch (err) {
      if ( cb )  cb(); 
      return _handleResponseError(err);
    }
  }


  //-----------------------USER ACTIVITIES------------------------------ 
  const loadPayments = async () => {
    setAdminLoading(true)
    try{ 
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };      
      const res = await axios.get("/api/admin/useractivities/payments", config);
      dispatch({
        type: PAYMENTS_LOADED,
        payload: res.data
      });      

    } catch (err) {
      _handleResponseError(err);
    }
    setAdminLoading(false);
  }


  const getAllUserActivities= async ({cb}) => {
    // setAdminLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.get(
        `/api/admin/useractivities/activities`,
        config
      );
      if( cb ) {   cb(res.data);  }
      // setAdminLoading(false);
      // return res.data
    } catch (err) {
      if ( cb ) cb(null); 
      return _handleResponseError(err);
    }
    // setAdminLoading(false);
  }


  const getSingleUserActivity= async ({activityId, next}) => {
    setAdminLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const res = await axios.get(
        `/api/admin/useractivities/payments/${activityId}`,
        config
      );

      next(res.data);

      // return res.data
    } catch (err) {
      next(null);
      _handleResponseError(err);
    }
    setAdminLoading(false);
  }


  // Update Payment
  const updatePayment = async ({formData, next}) => { 
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }; 
      const res = await axios.put(
        `/api/admin/useractivities/payments/${formData._id}`, formData,
        config
      );      
      next(res.data)
      setAlert(res.data.msg, "success", 3000);
    } catch (err ) {
      next(null)
      return _handleResponseError(err);
    }
  }  // End of Update Payment
  

  


  //-----------------------CUSTOMERS------------------------------

  // Add a Customer
  const addNewCustomer = async ({ 
    formData,
    cb  // callBack 
  }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.post(
        `/api/admin/customers/add`,
        formData,
        config
      );
      dispatch({
        type: CUSTOMER_ADDED,
        payload: res.data.customer
      });
      if ( cb ) {
        cb(res.data.customer);
      }
      setAlert(res.data.msg, "success", 3000);
      return res.data;
    } catch (err) {
      return _handleResponseError(err);
    }
  };

  // Update Customer
  const updateCustomer = async ({formData, id}) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };      
      const res = await axios.put(`/api/admin/customers/info/${id}`, formData, config);      
      dispatch({
        type: CUSTOMER_UPDATED,
        payload: res.data.customer
      });
      setAlert(res.data.msg, "success", 3000);
      return res.data      

    } catch (err ) {
      return _handleResponseError(err);
    }
  }

  // Delete Customer
  const deleteCustomer = async ({
    id, 
    cb  // callBack
  }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };      
      const res = await axios.delete(`/api/admin/customers/info/${id}`,  config);      
      dispatch({
        type: CUSTOMER_DELETED,
        payload: res.data.customer
      });
      if ( cb ) {
        cb(res.data.customer);
      }
      setAlert(res.data.msg, "success", 3000);
      return res.data
    } catch (err ) {
      if ( cb )  cb();      
      return _handleResponseError(err);
    }
  }  // End of Delete Customer



  // Load Customers
  const loadCustomers = async () => {
    try {

    setAdminLoading(true)
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };      
      const res = await axios.get("/api/admin/customers", config);

      // console.log(res.data);

      dispatch({
        type: CUSTOMERS_LOADED,
        payload: res.data
      });
    } catch (err) {
      _handleResponseError(err);
    }
    setAdminLoading(false);
  }  

  // Load Queried Users
  const loadQueriedUsers = async (
    searched,
    cb  // callBack
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      if (searched) {
        const res = await axios.get(
          `/api/admin/customers/query?searched=${searched}`,
          config
        );
        cb(res.data);
      } else {
        cb( [] );
      }
    } catch (err) {
      return _handleResponseError(err);
    }
  };


  const clearUserQuery = () => {
    dispatch({
      type: CLEAR_QUERIED_USERS
    });
  }

  const addPayment = async ({formData}) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      
      const { customerId, payment} = formData;

      const res = await axios.post(
        `/api/admin/customers/payment/${customerId}`, formData,
        config
      );

      setAlert(res.data.msg, "success", 3000);      
      
    } catch (err) {
      return _handleResponseError(err);
    }
  }

  



  // Load Single Customer
  const loadSingleCustomer = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }; 
      const res = await axios.get(`/api/admin/customers/info/${id}`, config);

      // console.log(res.data);

      if (res.data) return res.data;
    } catch (err) {
      return _handleResponseError(err);
    }
  }

  // Get Single Customer Activities
  const loadSingleCustomerActivities = async ({
    customerId,
    cb  // callBack
  }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }; 
      const res = await axios.get(`/api/admin/customers/all-activities/${customerId}`, config); 
      if( cb ) {
        cb( res.data );
      }

      if (res.data) return res.data;
    } catch (err) {
      return _handleResponseError(err);
    }
  }

  
  //-----------------------REPORTS------------------------------


  // Load Single Customer
  const loadDashboardReports = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }; 
      const res = await axios.get(`/api/admin/reports/dashboard-initial/`, config);

      // console.log(res.data);

      if (res.data) return res.data;
    } catch (err) {
      return _handleResponseError(err);
    }
  }


    //-----------------------EMPLOYEE------------------------------


  // Add a Customer
  const addNewEmployee = async ({ 
    formData,
    cb  // callBack 
  }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.post(
        `/api/admin/employee/add`,
        formData,
        config
      );
      // dispatch({
      //   type: CUSTOMER_ADDED,
      //   payload: res.data.customer
      // });
      if ( cb ) {
        cb(res.data.employee);
      }
      setAlert(res.data.msg, "success", 3000);
      return res.data;
    } catch (err) {
      return _handleResponseError(err);
    }
  };
  

  // Load All Employee
  const loadEmployeeList = async ({
    cb  // callBack
  }) => {
    try {
    setAdminLoading(true)
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };      
    const res = await axios.get("/api/admin/employee", config);
    cb(res.data);
    setAdminLoading(false);
    } catch (err) {
      return _handleResponseError(err);
    }
  }  

  

  







  return (
    <adminContext.Provider
      value={{ 
        // General Purpose
        setAdminLoading,       
        // Customers
        loadCustomers,
        addNewCustomer,
        updateCustomer,
        deleteCustomer,
        loadQueriedUsers,
        clearUserQuery,
        loadSingleCustomer,
        addPayment,
        loadSingleCustomerActivities,
        // User Activities
        loadPayments,
        getAllUserActivities, // for AdminDashboard
        getSingleUserActivity,
        updatePayment,
        // Orders
        loadOrders,
        loadSingleOrder,
        submitNewOrder,
        updateOrder,
        // Categories
        addCategory,
        deleteCategory,
        loadCategories,
        loadQueriedCategories,
        // Services
        loadServices,
        addNewService,
        loadSingleService,
        updateService,
        deleteService,
        loadQueriedServices,
        loadServiceStatuses,
        // Products
        loadProductsWithoutImages,
        updateProduct,
        addProduct,
        deleteProduct,
        loadQueriedProducts,
        // Reports
        loadDashboardReports,
        // Employee
        addNewEmployee,
        loadEmployeeList,
        // State variables
        customers: state.customers,
        orders: state.orders,
        categories: state.categories,
        services: state.services,
        serviceToBeEditted: state.serviceToBeEditted,
        serviceQuery: state.serviceQuery,
        serviceStatuses: state.serviceStatuses,
        userQuery: state.userQuery,
        products: state.products,
        productsQuery: state.productsQuery,
        orderToBeEditted: state.orderToBeEditted,
        loading: state.loading,
        payments: state.payments
      }}
    >
      {props.children}
    </adminContext.Provider>
  );
};

export default AdminState;
