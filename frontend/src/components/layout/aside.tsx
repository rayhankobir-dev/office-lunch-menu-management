import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { BaggageClaim, Gauge, ShoppingBag } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
              to="/dashboard"
              className={({ isActive }) =>
                cn(
                  "group flex items-center rounded-md pl-5 py-1.5 text-sm font-normal hover:bg-green-100 hover:text-green-700",
                  isActive ? "bg-green-100 text-green-700" : "transparent"
                )
              }
            >
              <Gauge className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
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
              <BaggageClaim className="mr-2 h-4 w-4" />
              <span>Menus</span>
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
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>My Choices</span>
            </NavLink>
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
}
