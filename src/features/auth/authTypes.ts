export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  password?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
