import axios from "axios";

let token = '';

const api = axios.create({
  baseURL: "/",
});

api.interceptors.request.use(
  config => {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  response => {
    if (response.data.token && response.data.token !== token) token = response.data.token;

    return response;
  },
  error => {
    if (error.response.status === 403) {
    }
    console.log(error.response.data.error);
    return Promise.reject(error);
  }
);

export default api;