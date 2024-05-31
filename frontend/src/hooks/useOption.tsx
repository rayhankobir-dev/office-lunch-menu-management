import { useContext } from "react";
import { OptionContextType } from "@/types";
import { OptionContext } from "@/context/optionContext";

const useOption = (): OptionContextType => {
  const context = useContext(OptionContext);
  if (context === undefined) {
    throw new Error("useOption must be used within an OptionsProvider");
  }
  return context;
};

export default useOption;
