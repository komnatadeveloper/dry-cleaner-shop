import { GET_FEATURED_SERVICES, SET_PUBLIC_LOADING } from "../types";

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FEATURED_SERVICES:
      return {
        ...state,
        featuredServices: payload
      };
    case SET_PUBLIC_LOADING:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};
