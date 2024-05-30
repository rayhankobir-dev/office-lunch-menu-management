import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DataTableDemo } from "./menu-table";
import Spinner from "../ui/spinner";
import useMenu from "@/hooks/useMenu";
import { ColumnDef } from "@tanstack/react-table";
import { IMenu } from "@/types";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { PenBox, Trash2 } from "lucide-react";

export default function MenuList() {
  const { menus, isFetching, deleteMenu } = useMenu();

  const columns: ColumnDef<IMenu>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Item name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "unit",
      header: () => <div className="text-right">Unit</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium capitalize">
            {row.getValue("unit")}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="flex justify-end">Actions</div>,
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 justify-end">
            <Button
              asChild
              className="w-8 h-8 p-0 bg-green-100 text-green-600 hover:text-white shadow-none duration-500"
            >
              <Link to={`${row.original.id}`}>
                <PenBox size={16} />
              </Link>
            </Button>
            <Button
              onClick={() => deleteMenu(row.original.id)}
              className="w-8 h-8 p-0 bg-rose-100 text-rose-600 hover:bg-rose-500 hover:text-white shadow-none duration-500"
            >
              <Trash2 size={17} />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>All menus</CardTitle>
      </CardHeader>
      <CardContent>
        {isFetching ? (
          <Spinner />
        ) : (
          menus && <DataTableDemo columns={columns} data={menus} />
        )}
      </CardContent>
    </Card>
  );
}
