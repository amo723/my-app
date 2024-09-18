import axios, { AxiosInstance } from "axios";
import { API_BASE_URL, API_BASE_URL_ONLINE, apiUrl } from "./config";

const api: AxiosInstance = axios.create({
  baseURL: "https://doctor.backbone-corp.com:8013/", // URL of your backend
  headers: {
    "Content-Type": "application/json",
  },
  /*httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Désactiver temporairement la vérification SSL
  }),*/
});

export default api;
