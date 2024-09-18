import Constants from "expo-constants";

export const API_BASE_URL = "http://127.0.0.1:8014/";
export const API_BASE_URL_ONLINE = "http://kerneltech.cloud/";

//export const apiUrl = Constants.expoConfig?.extra?.apiUrl || "http://192.168.42.124:8014/";
export const apiUrl =
  Constants.expoConfig?.extra?.apiUrl || "https://doctor.backbone-corp.com:8013/";
