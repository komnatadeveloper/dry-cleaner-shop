import axios from "axios";

const setAuthToken = (auth) => {
  
  const { token, userType } = JSON.parse(auth)
  if (token && userType) {
    axios.defaults.headers.common["x-auth-token"] = token;
    axios.defaults.headers.common["userType"] = userType;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
    delete axios.defaults.headers.common["userType"];
  }
};

export default setAuthToken;
