import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8014/", // URL of your backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
