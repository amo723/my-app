import axios from "axios";
import { User } from "../types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL, API_BASE_URL_ONLINE, apiUrl } from "@/constants/config";

//const API_URL = `${API_BASE_URL_ONLINE}api`;
const API_URL = `${apiUrl}api`;

export const loginUser = async (
  username: string,
  password: string
): Promise<User> => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    username,
    password,
  });
  const { token } = response.data;
  AsyncStorage.setItem("token", token);
  return getUserInfo();
};

export const registerUser = async (
  name: string,
  username: string,
  password: string
): Promise<User> => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    name,
    username,
    password,
  });
  const { token } = response.data;
  AsyncStorage.setItem("token", token);
  return getUserInfo();
};

export const getUserInfo = async (): Promise<User> => {
  const token = AsyncStorage.getItem("token");
  const response = await axios.get(`${API_URL}/users/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  AsyncStorage.removeItem("token");
};
