import axios from "axios";

// https://stackoverflow.com/questions/43002444/make-axios-send-cookies-in-its-requests-automatically
export const setAuthCredentialsTrue = () => {
  axios.defaults.withCredentials = true
}