import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DataTableDemo } from "./menu-table";

export default function MenuList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All menus</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTableDemo />
      </CardContent>
    </Card>
  );
}
