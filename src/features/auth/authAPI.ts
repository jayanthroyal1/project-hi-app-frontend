import { apiRequest } from "../../api/axios";
import type { LoginPayload, RegisterPayload } from "../../constants/types";

export const registerUser = async (data: RegisterPayload) => {
  const resposne = await apiRequest({
    method: "POST",
    url: "/api/auth/register",
    data: data,
  });
  console.log("From Auth API", resposne);
  console.log("From Auth response.data", resposne?.data);
  return resposne;
};

export const loginUser = async (data: LoginPayload) => {
  const response = await apiRequest({
    method: "POST",
    url: "/api/auth/login",
    data: data,
  });
  console.log("Getting Api resposne", response);
  return response;
};
