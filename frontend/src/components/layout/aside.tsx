import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Home, Users } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoRestaurantSharp } from "react-icons/io5";
import { MdFastfood } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";

interface Props {
  className?: string;
}

export function Sidebar({ className }: Props) {
  return (
    <aside className={cn("h-full", className, "md:hidden lg:block bg-gray-50")}>
      <div className="w-full h-full pt-2 pb-4 bg-slate">
        <ScrollArea className="h-full">
          <nav className="grid items-start gap-1.5">
            <NavLink
              end={true}
              to="/"
              className={({ isActive }) =>
                cn(
                  "group flex items-center rounded-md pl-5 py-1.5 text-sm font-normal hover:bg-green-100 hover:text-green-700",
                  isActive ? "bg-green-100 text-green-700" : "transparent"
                )
              }
            >
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </NavLink>
            <NavLink
              end={true}
              to="/users"
              className={({ isActive }) =>
                cn(
                  "group flex items-center rounded-md pl-5 py-1.5 text-sm font-normal hover:bg-green-100 hover:text-green-700",
                  isActive ? "bg-green-100 text-green-700" : "transparent"
                )
              }
            >
              <Users className="mr-2 h-4 w-4" />
              <span>Users</span>
            </NavLink>
            <NavLink
              end={true}
              to="/menus"
              className={({ isActive }) =>
                cn(
                  "group flex items-center rounded-md pl-5 py-1.5 text-sm font-normal hover:bg-green-100 hover:text-green-700",
                  isActive ? "bg-green-100 text-green-700" : "transparent"
                )
              }
            >
              <IoRestaurantSharp className="mr-2 h-4 w-4" />
              <span>Menus</span>
            </NavLink>
            <NavLink
              end={true}
              to="/menu-today"
              className={({ isActive }) =>
                cn(
                  "group flex items-center rounded-md pl-5 py-1.5 text-sm font-normal hover:bg-green-100 hover:text-green-700",
                  isActive ? "bg-green-100 text-green-700" : "transparent"
                )
              }
            >
              <MdFastfood className="mr-2 h-4 w-4" />
              <span>Today's Menus</span>
            </NavLink>
            <NavLink
              end={true}
              to="/my-choices"
              className={({ isActive }) =>
                cn(
                  "group flex items-center rounded-md pl-5 py-1.5 text-sm font-normal hover:bg-green-100 hover:text-green-700",
                  isActive ? "bg-green-100 text-green-700" : "transparent"
                )
              }
            >
              <IoFastFood className="mr-2 h-4 w-4" />
              <span>My Choices</span>
            </NavLink>
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
}
