import axios from "axios";
import { User } from "../types/user";

const API_URL = "http://192.168.0.11:8013/api";

/*const OPENCARE_SERVER = process.env.OPENCARE_SERVER;
const API_URL = `https//${OPENCARE_SERVER}/api`;*/

export const loginUser = async (
  username: string,
  password: string
): Promise<User> => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    username,
    password,
  });
  const { token } = response.data;
  localStorage.setItem("token", token);
  return getUserInfo();
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    name,
    email,
    password,
  });
  const { token } = response.data;
  localStorage.setItem("token", token);
  return getUserInfo();
};

export const getUserInfo = async (): Promise<User> => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/users/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  localStorage.removeItem("token");
};
