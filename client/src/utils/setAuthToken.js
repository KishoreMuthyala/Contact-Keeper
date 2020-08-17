import axios from "axios";

const setAuthToken = (jwt) => {
  if (jwt) {
    axios.defaults.headers.common["auth-token"] = jwt;
  } else {
    delete axios.defaults.headers.common["auth-token"];
  }
};

export default setAuthToken;
