import { useContext } from "react";
import { UserContextType } from "@/types";
import { UserContext } from "@/context/userContext";

const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};

export default useUser;
