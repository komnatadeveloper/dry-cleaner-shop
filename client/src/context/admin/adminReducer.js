import {
  CUSTOMERS_LOADED,
  ORDERS_LOADED,
  SERVICES_LOADED,
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
  SERVICE_ADDED,
  SERVICE_UPDATED,
  PRODUCT_DELETED,
  SERVICE_DELETED,
  SINGLE_ORDER_LOADED,
  ORDER_FORM_UPDATED,
  SET_ADMIN_LOADING
} from "../types";
import ServiceItemsInRows from "../../components/Admin/Services/ServiceItemsInRows";



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
        services: state.products.filter(service => service._id !== payload._id)
      };
    case CUSTOMERS_LOADED:
      return {
        ...state,
        customers: payload
      };
    case ORDERS_LOADED:
      return {
        ...state,
        orders: payload
      };
    case SERVICES_LOADED:
      return {
        ...state,
        services: payload
      };
    case QUERIED_SERVICES_LOADED:
      return {
        ...state,
        serviceQuery: payload
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
    case QUERIED_USERS_LOADED:
      return {
        ...state,
        userQuery: payload
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
