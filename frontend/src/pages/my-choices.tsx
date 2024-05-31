import { api } from "@/api";
import OptionList from "@/components/option/option-list";
import Spinner from "@/components/ui/spinner";
import useAuth from "@/hooks/useAuth";
import { formatDate } from "@/lib/utils";
import { IOption } from "@/types";
import { useEffect, useState } from "react";

export default function MyChoices() {
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState<IOption | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchMyOptions() {
      setLoading(true);
      try {
        const res = await api.get(
          `/user/${user?.id}/${formatDate(new Date())}`
        );
        console.log(res.data.data.option);
        setOption(res.data.data.option);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMyOptions();
  }, []);
  return (
    <section className="p-2.5">
      {loading ? (
        <Spinner />
      ) : (
        option && (
          <OptionList
            title="You choosen meal"
            subTitle="Please don't waste food."
            loading={loading}
            option={option}
          />
        )
      )}
    </section>
  );
}
