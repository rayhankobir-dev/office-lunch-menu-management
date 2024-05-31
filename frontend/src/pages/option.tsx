import OptionList from "@/components/option/option-list";
import Spinner from "@/components/ui/spinner";
import { OptionProvider } from "@/context/optionContext";
import useOption from "@/hooks/useOption";
import { formatDate } from "@/lib/utils";
import { IOption } from "@/types";
import { useEffect, useState } from "react";

export default function OptionPage() {
  return (
    <OptionProvider>
      <section className="p-3">
        <Options />
      </section>
    </OptionProvider>
  );
}

function Options() {
  const [loading, setLoading] = useState<boolean>(true);
  const [option, setOption] = useState<IOption | null>(null);
  const { getTodayMenus } = useOption();
  useEffect(() => {
    async function fetchTodayMenus() {
      const option = await getTodayMenus(formatDate(new Date()));
      setOption(option);
      setLoading(false);
    }
    fetchTodayMenus();
  }, [getTodayMenus]);
  return loading ? (
    <div className="h-screen flex justify-center items-center">
      <Spinner textHidden={true} />
    </div>
  ) : (
    <OptionList option={option} />
  );
}
