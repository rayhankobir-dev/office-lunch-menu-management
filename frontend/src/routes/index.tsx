import "../App.css";
import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/layout/admin-layout";
import Login from "@/pages/login";
import Home from "@/pages/home";
import Menu from "@/pages/menu";
import PrivateRoute from "./private-route";
import Option from "@/pages/option";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menus" element={<Menu />} />
          <Route path="/options" element={<Option />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
