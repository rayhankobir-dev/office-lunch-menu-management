/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/api";
import { AuthContextType, User } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setLoading(true);
      const res = await api.post("/user/login", credentials);

      const { token, user } = res.data.data;
      localStorage.setItem("token", token);
      setUser(user);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);

    delete api.defaults.headers.common["Authorization"];
    toast.success("You're logged out");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchProfile = async () => {
        try {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await api.get("/user/profile");
          setUser(response?.data?.data);
        } catch (error) {
          localStorage.removeItem("token");
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
