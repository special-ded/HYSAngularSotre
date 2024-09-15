export interface User {
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface CreateUser {
  username: string;
  password: string;
}

export interface UpdateUser {
  password: string;
}
