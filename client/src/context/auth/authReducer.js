
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  ADMIN_LOADED,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  LOGOUT,
  SET_AUTH_LOADING
} from "../types";




export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.user,
        userType: payload.userType
      };
    case ADMIN_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.admin,
        userType: payload.userType,
        loading: false
      };
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
    case ADMIN_LOGIN_SUCCESS:
      localStorage.setItem(
        "auth",
        JSON.stringify({
          token: payload.token,
          userType: payload.userType
        })
      );
      return {
        ...state,
        token: payload.token,
        userType: payload.userType,
        isAuthenticated: true,
        loading: false
      };
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: payload
      }
    case AUTH_ERROR:
    case USER_LOGIN_FAIL:
    case ADMIN_LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("auth");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        userType: null
      };
    default:
      return state;
  }


}