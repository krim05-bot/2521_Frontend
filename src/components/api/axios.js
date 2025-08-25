import axios from "axios";

const api = axios.create({
  baseURL: process.env.NODE_ENV === "development" 
    ? "http://13.124.245.13:8080/api"
    : "https://minsaengcheck.syu-likelion.org/api",
  withCredentials: true,
});


export default api;
