import axios from "axios";

function validateToken() {
  const expireDate = localStorage.getItem("expireDate");
    if(expireDate && expireDate !== 'undefined') {
      const currentTime = Math.floor(Date.now() / 1000)
      if(expireDate <= currentTime) {
        localStorage.removeItem("expireDate");
        return false;
      }
      else {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
        return true;
      }
    }
    else {
        return false;
    }
  }

export default validateToken;