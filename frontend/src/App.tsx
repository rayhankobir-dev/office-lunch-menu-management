import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "@/pages/login";
import Home from "@/pages/home";
import { AdminLayout } from "./components/layout/admin-layout";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
