export interface ILoginCredential {
  email: string;
  password: string;
}
export interface IMenuFormData {
  name: string;
  unit: string;
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}
