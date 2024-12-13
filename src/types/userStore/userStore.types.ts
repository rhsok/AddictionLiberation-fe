export type UserStore = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  user: UserType | null;
  setUser: (newUser: UserType | null) => void;
};

export interface UserType {
  id: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
  role: string;
}
