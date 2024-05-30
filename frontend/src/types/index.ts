export interface ILoginCredential {
  email: string;
  password: string;
}
export interface IMenuFormData {
  name: string;
  unit: string;
}

export interface IMenu extends IMenuFormData {
  id: number;
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

export interface MenuContextType {
  menus: IMenu[] | null;
  setMenus: React.Dispatch<React.SetStateAction<IMenu[] | null>>;
  isFetching: boolean;
  addMenu: (payload: IMenuFormData) => Promise<void>;
  updateMenu: (id: number, payload: IMenuFormData) => Promise<void>;
  deleteMenu: (id: number) => Promise<void>;
}
