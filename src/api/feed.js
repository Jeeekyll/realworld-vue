import axiosInstance from "./axios";

const getFeed = apiUrl => axiosInstance.get(apiUrl);

export default {
  getFeed,
}