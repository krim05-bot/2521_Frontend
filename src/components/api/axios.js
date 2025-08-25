import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "/api"  // 개발 환경에서는 vite proxy 사용
    : "https://minsaengcheck.syu-likelion.org/api", // 배포 환경에서는 백엔드 직접 호출
  withCredentials: true,
});

export default api;
