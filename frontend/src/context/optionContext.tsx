/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/api";
import { OptionContextType, IMenuFormData, IOption } from "@/types";

const OptionContext = createContext<OptionContextType | undefined>(undefined);

const OptionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [options, setOptions] = useState<IOption[] | null>(null);

  const chooseOption = async (payload: IMenuFormData) => {
    try {
      const res = await api.post("/options", payload);
      setOptions((prev: any) => [...prev, res.data.data.menu]);
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const getTodayMenus = async (date: string) => {
    try {
      const res = await api.get(`/options/${date}`);
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      return null;
    }
  };

  const updateChoices = async (id: number, payload: IMenuFormData) => {
    toast.promise(api.put(`/menus/${id}`, payload), {
      loading: "Updating...",
      success: (response) => {
        setOptions((prev: any) =>
          prev?.map((item: any) => (item.id === id ? response.data.menu : item))
        );
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
        const res = await api.get("/options");
        setOptions(res?.data?.data.options);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchMenus();
  }, []);

  return (
    <OptionContext.Provider
      value={{
        options,
        setOptions,
        isFetching,
        chooseOption,
        updateChoices,
        getTodayMenus,
      }}
    >
      {children}
    </OptionContext.Provider>
  );
};

export { OptionContext, OptionProvider };
