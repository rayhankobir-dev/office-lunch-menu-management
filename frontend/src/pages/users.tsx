import UserForm from "@/components/user/user-form";
import UserList from "@/components/user/user-list";
import { UserProvider } from "@/context/userContext";

export default function Users() {
  return (
    <UserProvider>
      <section className="space-y-3 p-4">
        <UserForm />
        <UserList />
      </section>
    </UserProvider>
  );
}
