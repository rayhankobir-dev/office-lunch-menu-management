/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import AppRoutes from "@/routes";
import useAuth from "@/hooks/useAuth";
import SpinerLoading from "@/components/ui/spinner";

export default function App() {
  const { loading }: { loading: boolean } = useAuth();
  return loading ? <FullPageLoader /> : <AppRoutes />;
}

function FullPageLoader() {
  return (
    <section className="h-screen w-screen flex justify-center items-center ">
      <SpinerLoading textHidden={true} size={40} className="text-green-600" />
    </section>
  );
}
