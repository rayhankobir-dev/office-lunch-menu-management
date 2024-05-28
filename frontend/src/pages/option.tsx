import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { IoCheckboxOutline } from "react-icons/io5";
import { IoCheckbox } from "react-icons/io5";

export default function OptionPage() {
  return (
    <section className="p-3">
      <Card>
        <CardHeader>
          <CardTitle>Todays Options</CardTitle>
          <CardDescription>Please don't waste the food</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-2.5">
          <Option />
          <Option />
          <Option />
          <Option />
          <Option />
          <Option />
        </CardContent>
      </Card>
    </section>
  );
}

function Option() {
  const [unit, setUnit] = React.useState<number>(1);
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  return (
    <Card>
      <CardHeader className="p-3">
        <CardTitle>Coconut Oil</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between p-3">
        <UnitCounter unit="Pices" count={unit} maxUnit={5} setCount={setUnit} />
        <SlectButton isSelected={isSelected} setSelected={setIsSelected} />
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
  count?: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const increment = () => {
    setCount((current) => (current < maxUnit ? current + 1 : current));
  };

  const decrement = () => {
    setCount((current) => (current > 1 ? current - 1 : current));
  };
  return (
    <div className="flex items-center gap-2 font-medium text-sm">
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

function SlectButton({
  isSelected,
  setSelected,
}: {
  isSelected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Toggle
      onClick={() => setSelected((current) => !current)}
      className="w-8 h-8 overflow-hidden p-0"
    >
      {isSelected ? (
        <IoCheckbox size={25} className="" />
      ) : (
        <IoCheckboxOutline size={25} />
      )}
    </Toggle>
  );
}
