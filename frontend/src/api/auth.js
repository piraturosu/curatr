import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const loginUser = async ({ username, password }) => {
  const res = await axios.post(`${API_URL}/auth/login`, { username, password });
  return res.data;
};
