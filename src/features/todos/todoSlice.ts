import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Todo, TodoState } from "./todoTypes";

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Get all todos
    getTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    // Create
    createTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.unshift(action.payload);
    },
    // update
    updateTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos?.map((todo) =>
        todo?._id === action.payload._id ? action?.payload : todo,
      );
    },
    // Delete
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
  },
});

export const { getTodos, createTodo, updateTodo, deleteTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
