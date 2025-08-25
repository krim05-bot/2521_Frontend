import axios from "axios";

const api = axios.create({
  baseURL: "/api",   // ✅ 여기서 프록시를 태움
  withCredentials: true,
});

export default api;
