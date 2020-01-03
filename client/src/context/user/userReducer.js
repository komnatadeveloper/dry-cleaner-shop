import {
  USER_ORDER_FORM_SUBMITTED,
  SET_USER_LOADING,
  USER_ORDERS_LOADED

} from "../types";


export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_LOADING:
      return {
        ...state,
        loading: payload
      };
    case USER_ORDERS_LOADED:
      return {
        ...state,
        orders: payload
      };
    case USER_ORDER_FORM_SUBMITTED:
      return {
        ...state,
        orders: [ ...state.orders, payload]
      };
    default:
      return state;
  }
};
