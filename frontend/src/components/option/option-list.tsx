import { Option } from "@/components/option/option";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";
import { IOption, IOptionMenu } from "@/types";
import { useState } from "react";
import { PiBowlFoodBold } from "react-icons/pi";
import { Button } from "../ui/button";

export interface ISelectedMenus extends IOptionMenu {
  unit: number;
}

interface OptionListProps {
  title?: string;
  subTitle?: string;
  loading?: boolean;
  option: IOption | null;
}
export default function OptionList({
  title = "",
  subTitle,
  loading = false,
  option,
}: OptionListProps) {
  const [selectedMenus, setSelectedMenus] = useState<ISelectedMenus[] | null>(
    null
  );

  const saveChooices = async () => {
    console.log(selectedMenus);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title || "Today's meal menus"}</CardTitle>
        <CardDescription>{subTitle}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-2.5">
        {loading ? (
          <Spinner />
        ) : (
          option?.menus.map((menu: IOptionMenu) => (
            <Option
              selectedMenus={selectedMenus}
              setSelectedMenus={setSelectedMenus}
              key={menu.option_id}
              option={menu}
            />
          ))
        )}
      </CardContent>
      <CardFooter>
        <Button size={"lg"} className="gap-2" onClick={saveChooices}>
          <PiBowlFoodBold />
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
