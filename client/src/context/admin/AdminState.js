import React, { useReducer, useContext } from "react";
import axios from "axios";
import adminContext from "./adminContext";
import adminReducer from "./adminReducer";
import alertContext from "../alert/alertContext";

import {
  CUSTOMERS_LOADED,
  ORDERS_LOADED,
  SERVICES_LOADED,
  SERVICE_ADDED,
  SERVICE_UPDATED,
  SINGLE_SERVICE_LOADED,
  CUSTOMER_ADDED,
  CUSTOMER_UPDATED,
  QUERIED_SERVICES_LOADED,
  CLEAR_QUERIED_SERVICES,
  SERVICE_STATUSES_LOADED,
  QUERIED_USERS_LOADED,
  ORDER_FORM_SUBMITTED,
  PRODUCTS_INFO_LOADED,
  PRODUCT_ADDED,
  PRODUCT_UPDATED,
  QUERIED_PRODUCTS_LOADED,
  PRODUCT_DELETED,
  SERVICE_DELETED,
  SINGLE_ORDER_LOADED,
  ORDER_FORM_UPDATED,
  SET_ADMIN_LOADING
} from "../types";

const AdminState = props => {
  const initialState = {
    customers: [],
    orders: [],
    services: [],
    serviceToBeEditted: null,
    serviceQuery: [],
    serviceStatuses: [],
    userQuery: [],
    products: [],
    productsQuery: [],
    loading: true
  }; // initialState END-OF

  const alertContext1 = useContext(alertContext);
  const { setAlert } = alertContext1;

  const [state, dispatch] = useReducer(adminReducer, initialState);


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
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => setAlert(error.msg, "danger", 2500));
      }
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
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => setAlert(error.msg, "danger", 2500));
      }
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
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => setAlert(error.msg, "danger", 2500));
      }
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
      const errors = err.response.data.errors;


      if (errors) {
        errors.forEach(error => setAlert(error.msg, "danger", 2500));
      }
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
    } catch (err) {}
  };

  

  


  //-----------------------SERVICES------------------------------

  // Add a Service
  const addNewService = async ({ formData }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const res = await axios.post(`/api/admin/services`, formData, config);

      if (res.data) {
        dispatch({
          type: SERVICE_ADDED,
          payload: res.data
        });
      }
      setAlert(res.data.msg, "success", 3000);
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => setAlert(error.msg, "danger", 2500));
      }
    }
  };

  // Update a Service
  const updateService = async ({ formData, serviceId }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const res = await axios.put(`/api/admin/services/${serviceId}`, formData, config);

      dispatch({
        type: SERVICE_UPDATED,
        payload: res.data.service
      });
      setAlert(res.data.msg, "success", 3000);

    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => setAlert(error.msg, "danger", 2500));
      }
    }
  };

  // Delete a Service
  const deleteService = async (_id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.delete(`/api/admin/services/${_id}`, config);

      dispatch({
        type: SERVICE_DELETED,
        payload: res.data.service
      });
      setAlert(res.data.msg, "success", 3000);

    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => setAlert(error.msg, "danger", 2500));
      }
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
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => setAlert(error.msg, "danger", 2500));
      }
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
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => setAlert(error.msg, "danger", 2500));
      }
    }
  };

  // Load Single Service
  const loadSingleService = async ({serviceId}) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };     
      const res = await axios.get(`/api/admin/services/info/${serviceId}`, config);

      dispatch({
        type: SINGLE_SERVICE_LOADED,
        payload: res.data
      });

      return res.data
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => setAlert(error.msg, "danger", 2500));
      }
    }
  }

  

  // Query Services
  const loadQueriedServices = async (searched) => {
    try {
    
      const config = {
        headers: {
          "Content-Type": "application/json"
      }
    };
    if(searched){
      const res = await axios.get(`/api/admin/services/query?searched=${searched}`, config);
      // console.log(res.data);

      dispatch({
        type: QUERIED_SERVICES_LOADED,
        payload: res.data
      });
    } else {
      dispatch({
        type: CLEAR_QUERIED_SERVICES        
      });     
    }  

    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => setAlert(error.msg, "danger", 2500));
      }
    }
  }




  
  //-----------------------ORDERS---------------------------------
 
  // Submit New Order
  const submitNewOrder = async ({ formData }) => {
    // console.log(formData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.post(`/api/admin/orders`, formData, config);

      dispatch({
        type: ORDER_FORM_SUBMITTED,
        payload: res.data.order
      });

      setAlert(res.data.msg, "success", 3000);

    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => setAlert(error.msg, "danger", 2500));
      }
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
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => setAlert(error.msg, "danger", 2500));
      }
    }
  };


  // Load Single Order
  const loadSingleOrder = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };   

      const res = await axios.get(`/api/admin/orders/${id}`, config);

      // console.log(res.data);

      dispatch({
        type: SINGLE_ORDER_LOADED,
        payload: res.data
      });
      return res.data

    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => setAlert(error.msg, "danger", 2500));
      }
    }
  }

  // Load Orders
  const loadOrders = async () => {
    try {
    setAdminLoading(true)
    
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };      
      const res = await axios.get("/api/admin/orders", config);

      console.log('HELLO FROM LOAD ORDERS');

      // console.log(res.data);

      dispatch({
        type: ORDERS_LOADED,
        payload: res.data
      });

      setAdminLoading(false);

    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => setAlert(error.msg, "danger", 2500));
      }
    }
  }

  

  


  //-----------------------CUSTOMERS------------------------------

  // Add a Customer
  const addNewCustomer = async ({ formData }) => {
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

      console.log(res.data);

      setAlert(res.data.msg, "success", 3000);

      return res.data;

    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => setAlert(error.msg, "danger", 2500));
      }
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

      console.log(res.data);
      
      dispatch({
        type: CUSTOMER_UPDATED,
        payload: res.data.customer
      });
      

      setAlert(res.data.msg, "success", 3000);

      return res.data      

    } catch (err ) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => setAlert(error.msg, "danger", 2500));
      }
    }
  }

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
    setAdminLoading(false);
    } catch (err) {
      
    }
  }  

  // Load Queried Users
  const loadQueriedUsers = async searched => {
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

        // console.log(res.data);

        dispatch({
          type: QUERIED_USERS_LOADED,
          payload: res.data
        });
      } else {
        dispatch({
          type: CLEAR_QUERIED_SERVICES
        });
      }
    } catch (err) {}
  };

  



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
      
    }
  }


  

  

  

  







  return (
    <adminContext.Provider
      value={{        
        // Customers
        loadCustomers,
        updateCustomer,
        addNewCustomer,
        loadQueriedUsers,
        loadSingleCustomer,
        // Orders
        loadOrders,
        loadSingleOrder,
        submitNewOrder,
        updateOrder,
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
        customers: state.customers,
        orders: state.orders,
        services: state.services,
        serviceToBeEditted: state.serviceToBeEditted,
        serviceQuery: state.serviceQuery,
        serviceStatuses: state.serviceStatuses,
        userQuery: state.userQuery,
        products: state.products,
        productsQuery: state.productsQuery,
        orderToBeEditted: state.orderToBeEditted,
        loading: state.loading
      }}
    >
      {props.children}
    </adminContext.Provider>
  );
};

export default AdminState;
