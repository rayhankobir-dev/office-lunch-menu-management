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
  role: "admin" | "employee";
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

export interface IOption {
  date: string;
  menus: IOptionMenu[];
}

export interface IOptionMenu {
  option_id: number;
  max_limit: number;
  menu_id: number;
  menu_name: string;
  menu_unit: string;
}

export interface OptionContextType {
  options: IOption[] | null;
  setOptions: React.Dispatch<React.SetStateAction<IOption[] | null>>;
  isFetching: boolean;
  chooseOption: (payload: IMenuFormData) => Promise<void>;
  updateChoices: (id: number, payload: IMenuFormData) => Promise<void>;
  getTodayMenus: (date: string) => Promise<IOption>;
}

export interface IUserFormData {
  full_name: string;
  email: string;
  password: string;
  role: string;
}
export interface UserContextType {
  users: User[] | null;
  isFetching: boolean;
  setUsers: React.Dispatch<React.SetStateAction<User[] | null>>;
  addUser: (payload: IUserFormData) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}
