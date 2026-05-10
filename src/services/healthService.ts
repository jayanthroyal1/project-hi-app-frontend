import { apiRequest } from "../api/axios";

export const getHealthStatus = async () => {
  const response = await apiRequest({ url: "/health" });
  return response;
};
