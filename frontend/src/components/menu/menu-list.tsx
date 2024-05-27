import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DataTableDemo } from "./menu-table";
import { api } from "@/api";
import Spinner from "../ui/spinner";

export default function MenuList() {
  const [menus, setMenus] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    const fetchMenus = async () => {
      setIsFetching(true);
      try {
        const response = await api.get("/menus");
        setMenus(response.data.data.menus);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchMenus();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>All menus</CardTitle>
      </CardHeader>
      <CardContent>
        {isFetching ? <Spinner /> : <DataTableDemo data={menus} />}
      </CardContent>
    </Card>
  );
}
