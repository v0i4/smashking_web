import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  //baseURL: "http://192.168.0.10:3000",
});

export default api;
