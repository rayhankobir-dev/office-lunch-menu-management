import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/api";
import { MenuContextType, IMenu, IMenuFormData } from "@/types";

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [menus, setMenus] = useState<IMenu[] | null>(null);

  const addMenu = async (payload: IMenuFormData) => {
    try {
      const res = await api.post("/menus", payload);
      setMenus((prev) => [...prev, res.data.data.menu]);
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const updateMenu = async (id: number, payload: IMenuFormData) => {
    toast.promise(api.put(`/menus/${id}`, payload), {
      loading: "Updating...",
      success: (response) => {
        setMenus((prev) =>
          prev?.map((item) => (item.id === id ? response.data.menu : item))
        );
        return response.data.message;
      },
      error: (error) => {
        return error.response.data.message;
      },
    });
  };

  const deleteMenu = async (id: number) => {
    toast.promise(api.delete(`/menus/${id}`), {
      loading: "Deleting...",
      success: (response) => {
        setMenus((prev) => prev?.filter((item) => item.id !== id));
        return response.data.message;
      },
      error: (error) => {
        return error.response.data.message;
      },
    });
  };

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await api.get("/menus");
        setMenus(res?.data?.data.menus);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchMenus();
  }, []);

  return (
    <MenuContext.Provider
      value={{ menus, setMenus, isFetching, addMenu, updateMenu, deleteMenu }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export { MenuContext, MenuProvider };
