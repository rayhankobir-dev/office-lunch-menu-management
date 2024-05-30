import MenuForm from "@/components/menu/menu-form";
import MenuList from "@/components/menu/menu-list";
import { MenuProvider } from "@/context/menuContext";

export default function Menu() {
  return (
    <MenuProvider>
      <section className="space-y-3 p-4">
        <MenuForm />
        <MenuList />
      </section>
    </MenuProvider>
  );
}
