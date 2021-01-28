import { GET_SERVICES_AND_CATEGORIES, SET_PUBLIC_LOADING, ADD_TO_CART, SET_CART } from "../types";

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SERVICES_AND_CATEGORIES:
      return {
        ...state,
        publicServices: payload.services,
        publicCategories: payload.categories,
      };
    case SET_PUBLIC_LOADING:
      return {
        ...state,
        loading: payload
      };
    case ADD_TO_CART:
    case SET_CART:
      return {
        ...state,
        cart: payload
      };
    default:
      return state;
  }
};
