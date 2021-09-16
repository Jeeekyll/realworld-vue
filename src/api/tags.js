import axiosInstance from "./axios";

const getTags = () => axiosInstance.get('/tags');

export default {
  getTags,
}