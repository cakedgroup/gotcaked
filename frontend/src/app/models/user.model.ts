export interface User {
  id: string;
  name: string;
  description: string;
  picture_uri: string;
  email: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface JWT {
  status: string;
  token: string;
}

export interface JWTContent {
  id: string;
  email: string;
  role: string;
}

