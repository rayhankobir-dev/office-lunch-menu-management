import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Spinner from "../ui/spinner";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { PenBox, Trash2 } from "lucide-react";
import useUser from "@/hooks/useUser";
import { DataTable } from "../ui/data-table";

export default function UserList() {
  const { users, isFetching, deleteUser } = useUser();

  const columns: ColumnDef<User>[] = [
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
      accessorKey: "full_name",
      header: "Full name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("full_name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: () => <div className="text-left">Email</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium lowercase">
            {row.getValue("email")}
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
              onClick={() => deleteUser(row.original.id)}
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
        <CardTitle>All users</CardTitle>
      </CardHeader>
      <CardContent>
        {isFetching ? (
          <Spinner />
        ) : (
          users && <DataTable searchBy="email" columns={columns} data={users} />
        )}
      </CardContent>
    </Card>
  );
}
