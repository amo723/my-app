import axios from "axios";
import { User } from "../types/user";

const OPENCARE_SWITCH = process.env.OPENCARE_SERVER;

const API_URL = "http://localhost:8014/api";

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
  username: string,
  password: string
): Promise<User> => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    name,
    username,
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
