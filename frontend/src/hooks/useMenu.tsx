import { useContext } from "react";
import { MenuContextType } from "@/types";
import { MenuContext } from "@/context/menuContext";

const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within an MenuProvider");
  }
  return context;
};

export default useMenu;
