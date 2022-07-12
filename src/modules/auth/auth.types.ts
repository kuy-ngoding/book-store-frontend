import { User } from "../users/dtos/models/user.entity";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  persistedToken: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}
