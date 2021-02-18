import axios from "axios";

axios.interceptors.response.use(null, (error) => {
    const expectedError =
      error?.response?.status &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedError) {
      console.log("INTERCEPTOR response");
      alert("Serverds qandaydir muammo bor?");
    }
    return Promise.reject(error);
  });

  axios.defaults.baseURL = "https://jsonplaceholder.typicode.com"

  const http = {
      get: axios.get,
      post: axios.post,
      put: axios.put,
      delete: axios.delete,
  }
  export default http;