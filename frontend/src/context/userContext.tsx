/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/api";
import { UserContextType, User, IUserFormData } from "@/types";

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [users, setUsers] = useState<User[] | null>(null);

  const addUser = async (payload: IUserFormData) => {
    toast.promise(api.post("/user", payload), {
      loading: "Deleting...",
      success: (response) => {
        return response.data.message;
      },
      error: (error) => {
        return error.response.data.message;
      },
    });
  };

  const deleteUser = async (id: string) => {
    toast.promise(api.delete("/user/" + id), {
      loading: "Deleting...",
      success: (response) => {
        setUsers((prev: any) => prev?.filter((item: any) => item.id !== id));
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
        const res = await api.get("/user");
        console.log(res);
        setUsers(res?.data?.data.users);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchMenus();
  }, []);

  return (
    <UserContext.Provider
      value={{ users, setUsers, isFetching, addUser, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
