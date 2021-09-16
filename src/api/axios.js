import axios from "axios";
import {getItem} from "../helpers/persistenceStorage";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

axiosInstance.interceptors.request.use(config => {
  const token = getItem('token');
  const authorizationToken = token ? `Token ${token}` : '';
  config.headers.Authorization = authorizationToken;
  return config;
})

export default axiosInstance;