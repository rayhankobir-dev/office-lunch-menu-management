import "../App.css";
import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/layout/admin-layout";
import Login from "@/pages/login";
import Home from "@/pages/home";
import Menu from "@/pages/menu";
import PrivateRoute from "./private-route";
import Option from "@/pages/option";
import MyChoices from "@/pages/my-choices";
import Users from "@/pages/users";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/menus" element={<Menu />} />
          <Route path="/menu-today" element={<Option />} />
          <Route path="/my-choices" element={<MyChoices />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
