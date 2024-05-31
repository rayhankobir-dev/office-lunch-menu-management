/* eslint-disable @typescript-eslint/no-explicit-any */
import { Toggle } from "@/components/ui/toggle";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { IoCheckboxOutline } from "react-icons/io5";
import { IoCheckbox } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IOptionMenu } from "@/types";
import { ISelectedMenus } from "./option-list";

export interface OptionProps {
  option: IOptionMenu;
  selectedMenus: ISelectedMenus[] | null;
  setSelectedMenus: React.Dispatch<
    React.SetStateAction<ISelectedMenus[] | null>
  >;
}

export function Option({
  option,
  selectedMenus,
  setSelectedMenus,
}: OptionProps) {
  const isSelected = selectedMenus
    ? selectedMenus.some((item) => item.option_id === option.option_id)
    : false;

  const [unit, setUnit] = React.useState<number>(1);

  const toggleSelectedMenu = () => {
    setSelectedMenus((prev) => {
      if (!prev) return [{ ...option, unit }];

      if (isSelected) {
        return prev.filter((item) => item.option_id !== option.option_id);
      } else {
        return [...prev, { ...option, unit }];
      }
    });
  };

  return (
    <Card>
      <CardHeader className="p-3">
        <CardTitle>{option.menu_name}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between p-3">
        <UnitCounter
          unit={option.menu_unit}
          count={unit}
          maxUnit={option.max_limit}
          setCount={setUnit}
        />
        <SelectButton
          isSelected={isSelected}
          toggleSelected={toggleSelectedMenu}
        />
      </CardContent>
    </Card>
  );
}

function UnitCounter({
  maxUnit,
  unit,
  count,
  setCount,
}: {
  maxUnit: number;
  unit: string;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const increment = () => {
    setCount((current) => (current < maxUnit ? current + 1 : current));
  };

  const decrement = () => {
    setCount((current) => (current > 1 ? current - 1 : current));
  };

  return (
    <div className="flex items-center gap-2 font-medium text-sm capitalize">
      <Button onClick={decrement} className="w-5 h-5 p-1">
        <Minus />
      </Button>
      {count} {unit}
      <Button onClick={increment} className="w-5 h-5 p-1">
        <Plus />
      </Button>
    </div>
  );
}

function SelectButton({
  isSelected,
  toggleSelected,
}: {
  isSelected: boolean;
  toggleSelected: () => void;
}) {
  return (
    <Toggle onClick={toggleSelected} className="w-8 h-8 overflow-hidden p-0">
      {isSelected ? <IoCheckbox size={25} /> : <IoCheckboxOutline size={25} />}
    </Toggle>
  );
}
