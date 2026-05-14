/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  createTodoApi,
  deleteDataApi,
  fetchTodosApi,
  updateTodoApi,
} from "../features/todos/todoAPI";

import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../features/todos/todoSlice";

import type { RootState } from "../store/store";

import type { Todo } from "../features/todos/todoTypes";

import { handleApiError } from "../utils/common";

function TodoPage() {
  const dispatch = useDispatch();

  const todos = useSelector((state: RootState) => state.todos.todos);

  const [title, setTitle] = useState<string>("");

  const [editTodoId, setEditTodoId] = useState<string | null>(null);

  const [completed, setCompleted] = useState<boolean>(false);

  // Load Todos
  const loadTodos = async () => {
    try {
      const response = await fetchTodosApi();

      dispatch(getTodos(response));
    } catch (err) {
      handleApiError({
        err,
        action: "Fetch Todos",
      });
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  // Reset Form
  const resetForm = () => {
    setTitle("");
    setEditTodoId(null);
    setCompleted(false);
  };

  // Create Todo
  const handleCreateTodo = async () => {
    if (!title.trim()) {
      return toast.error("Enter title to create todo");
    }

    try {
      const response = await createTodoApi(title);

      dispatch(createTodo(response));

      toast.success("Todo created successfully");

      resetForm();
    } catch (err) {
      handleApiError({
        err,
        action: "Create Todo",
      });
    }
  };

  // Update Todo
  const handleUpdateTodo = async () => {
    if (!editTodoId || !title.trim()) return;

    try {
      const response = await updateTodoApi(editTodoId, {
        title,
        completed,
      });

      dispatch(updateTodo(response));

      toast.success("Todo updated successfully");

      resetForm();
    } catch (err) {
      handleApiError({
        err,
        action: "Update Todo",
      });
    }
  };

  // Delete Todo
  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteDataApi(id);

      dispatch(deleteTodo(id));

      toast.success("Todo deleted successfully");
    } catch (err) {
      handleApiError({
        err,
        action: "Delete Todo",
      });
    }
  };

  // Edit Mode
  const handleEditClick = (todo: Todo) => {
    setEditTodoId(todo._id);
    setTitle(todo.title);
    setCompleted(todo.completed);
  };

  return (
    <div className="max-w-xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Todo App</h1>

      <div className="flex gap-3 mb-5">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo"
          className="border p-2 rounded w-full"
        />

        {editTodoId ? (
          <button
            onClick={handleUpdateTodo}
            className="bg-green-600 text-white px-4 rounded"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleCreateTodo}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Create
          </button>
        )}
      </div>

      {editTodoId && (
        <label className="flex items-center gap-2 mb-5">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Mark as Completed
        </label>
      )}

      <div className="flex flex-col gap-3">
        {todos?.map((todo: Todo) => (
          <div
            key={todo._id}
            className="flex items-center justify-between border rounded p-3"
          >
            <div>
              <p
                className={`font-medium ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.title}
              </p>

              <p className="text-sm text-gray-500">
                Status: {todo.completed ? "Completed" : "Pending"}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleEditClick(todo)}
                className="text-green-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteTodo(todo._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoPage;
