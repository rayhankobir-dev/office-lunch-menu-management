import { Option } from "@/components/option/option";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";
import useOption from "@/hooks/useOption";
import { formatDate } from "@/lib/utils";
import { IOption, IOptionMenu } from "@/types";
import { useEffect, useState } from "react";
import { PiBowlFoodBold } from "react-icons/pi";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export interface ISelectedMenus extends IOptionMenu {
  unit: number;
}

export default function OptionList() {
  const [isFetching, setIsFetching] = useState(true);
  const [option, setOption] = useState<IOption | null>(null);
  const [selectedMenus, setSelectedMenus] = useState<ISelectedMenus[] | null>(
    null
  );

  const { getTodayMenus } = useOption();

  const saveChooices = async () => {
    console.log(selectedMenus);
  };

  useEffect(() => {
    async function getData() {
      const option = await getTodayMenus(formatDate(new Date()));
      setIsFetching(false);
      setOption(option);
    }
    getData();
  }, [getTodayMenus]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your meal menus</CardTitle>
        <CardDescription>
          Please choose your meal and don't waste the food
        </CardDescription>
      </CardHeader>
      <CardContent>
        <section className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2.5">
            {selectedMenus?.map((menu: IOptionMenu) => (
              <Option
                selectedMenus={selectedMenus}
                setSelectedMenus={setSelectedMenus}
                key={menu.option_id}
                option={menu}
              />
            ))}
          </div>
          <Button size={"lg"} className="gap-2" onClick={saveChooices}>
            <PiBowlFoodBold />
            Save
          </Button>
        </section>

        <Separator className="my-4" />
        <section>
          <CardTitle>Todays Options</CardTitle>
          <CardDescription className="mb-3">
            Please don't waste the food
          </CardDescription>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2.5">
            {isFetching ? (
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
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
