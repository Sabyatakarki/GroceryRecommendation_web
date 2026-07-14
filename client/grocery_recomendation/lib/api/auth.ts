import api from "./axios";
import ENDPOINTS from "./endpoints";

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const response = await api.post(
    ENDPOINTS.AUTH.REGISTER,
    data
  );

  return response.data;
};

export const loginUser = async (data: LoginData) => {
  const response = await api.post(
    ENDPOINTS.AUTH.LOGIN,
    data
  );

  return response.data;
};