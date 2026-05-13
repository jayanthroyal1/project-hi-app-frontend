import { apiRequest } from "../../api/axios";
import type { UpdateTodoPayload } from "./todoTypes";

export const fetchTodosApi = async () => {
  const response = await apiRequest({ url: "/api/todos" });
  return response.data;
};

export const createTodoApi = async (title: string) => {
  const response = await apiRequest({
    method: "POST",
    url: "/api/todos",
    data: { title },
  });
  return response.data;
};

export const updateTodoApi = async (
  todoId: string,
  payload: UpdateTodoPayload,
) => {
  const response = await apiRequest({
    method: "PUT",
    url: `/api/todos/${todoId}`,
    data: payload,
  });
  return response.data;
};

export const deleteDataApi = async (id: string) => {
  const response = await apiRequest({
    method: "DELETE",
    url: `/api/todos/${id}`,
  });
  return response.data;
};
