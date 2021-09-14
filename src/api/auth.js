import axiosInstance from "./axios";

const register = data => {
  return axiosInstance.post('/users', {user: data});
}

export default {
  register,
}