import axiosInstance from "./axios";

const register = data => axiosInstance.post('/users', {user: data});
const login = data =>  axiosInstance.post('/users/login', {user: data});
const getCurrentUser = () =>  axiosInstance.get('/user');

export default {
  register,
  login,
  getCurrentUser
}