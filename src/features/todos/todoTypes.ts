export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TodoState {
  todos: Todo[];
}

export interface UpdateTodoPayload {
  title?: string;
  completed?: boolean;
}
