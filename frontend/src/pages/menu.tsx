import MenuForm from "@/components/menu/menu-form";
import MenuList from "@/components/menu/menu-list";

export default function Menu() {
  return (
    <section className="space-y-3 p-4">
      <MenuForm />
      <MenuList />
    </section>
  );
}
