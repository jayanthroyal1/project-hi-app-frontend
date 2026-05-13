import { apiRequest } from "../../api/axios";

export const getCurrentUser = async () => {
  const response = await apiRequest({ url: "/api/users/me" });
  return response.data;
};
