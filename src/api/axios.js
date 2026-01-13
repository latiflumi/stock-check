import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.10.44:5000/api",
  withCredentials: true,
});

export default api;
