"use client";

import { loginUser, registerUser } from "../api/auth";

export const registerAction = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const response = await registerUser({
      fullName,
      email,
      password,
    });

    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Registration failed."
    );
  }
};

export const loginAction = async (
  email: string,
  password: string
) => {
  try {
    const response = await loginUser({
      email,
      password,
    });

    if (response.data?.token) {
      localStorage.setItem(
        "token",
        response.data.token
      );
    }

    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Login failed."
    );
  }
};