import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

type ApiRequestProps = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  data?: unknown;
  params?: unknown;
  headers?: Record<string, string>;
};

export const apiRequest = async ({
  method = "GET",
  url,
  data,
  params,
  headers,
}: ApiRequestProps) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
      headers,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default axiosInstance;
