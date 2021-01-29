import {
  // Customers
  CUSTOMERS_LOADED,
  CUSTOMER_DELETED,
  PAYMENTS_LOADED,
  SERVICES_LOADED,
  SINGLE_SERVICE_LOADED,
  SERVICE_STATUSES_LOADED,  
  // Categories
  CATEGORIES_LOADED,
  CATEGORY_ADDED,
  CATEGORY_DELETED,
  // Products
  PRODUCTS_INFO_LOADED,
  PRODUCT_ADDED,
  PRODUCT_UPDATED,
  QUERIED_PRODUCTS_LOADED,
  // Services
  SERVICE_ADDED,
  SERVICE_UPDATED,
  PRODUCT_DELETED,
  SERVICE_DELETED,
  CLEAR_QUERIED_SERVICES,
  // Orders
  ORDERS_LOADED,
  // Users
  CLEAR_QUERIED_USERS,
  SET_ADMIN_LOADING,
} from "../types";




export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ADMIN_LOADING:
      return {
        ...state,
        loading: payload
      };
    case PRODUCT_ADDED:
      return {
        ...state,
        products: [...state.products, payload]
      };
    case PRODUCT_DELETED:
      return {
        ...state,
        products: state.products.filter(
          product => product.name !== payload.name
        )
      };
    case PRODUCT_UPDATED:
      return {
        ...state,
        products: state.products.map(product =>
          product._id === payload._id ? payload : product
        )
      };
    case CATEGORIES_LOADED:
      return {
        ...state,
        categories: payload
      };
    case CATEGORY_ADDED:
      return {
        ...state,
        categories: [...state.categories, payload]
      };
    case CATEGORY_DELETED:
      return {
        ...state,
        categories: state.categories.filter(
          category => category._id !== payload._id
        )
      };
    case SERVICE_ADDED:
      return {
        ...state,
        services: [...state.services, payload]
      };
    case SERVICE_UPDATED:
      return {
        ...state,
        services: state.services.map(service =>
          service._id === payload._id ? payload : service
        )
      };
    case SERVICE_DELETED:
      return {
        ...state,
        services: state.services.filter(service => service._id !== payload._id)
      };
    case CUSTOMERS_LOADED:
      return {
        ...state,
        customers: payload
      };
    case CUSTOMER_DELETED:
      return {
        ...state,
        customers: state.customers.filter(
          customerItem => customerItem._id !== payload._id
        )
      };
    case ORDERS_LOADED:
      return {
        ...state,
        orders: payload
      };
    case PAYMENTS_LOADED:
      return {
        ...state,
        payments: payload
      };
    case SERVICES_LOADED:
      return {
        ...state,
        services: payload
      };
    case CLEAR_QUERIED_SERVICES:
      return {
        ...state,
        serviceQuery: []
      };
    case SERVICE_STATUSES_LOADED:
      return {
        ...state,
        serviceStatuses: payload
      };
    case SINGLE_SERVICE_LOADED:
      return {
        ...state,
        serviceToBeEditted: payload
      };
    case CLEAR_QUERIED_USERS:
      return {
        ...state,
        userQuery: []
      };
    case PRODUCTS_INFO_LOADED:
      return {
        ...state,
        products: payload
      };
    case QUERIED_PRODUCTS_LOADED:
      return {
        ...state,
        productsQuery: payload
      };
    default:
      return state;
  }
};
