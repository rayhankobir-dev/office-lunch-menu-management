/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import Logo from "@/assets/react.svg";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";

export default function Navbar() {
  const user = { fullName: "raju" };

  return (
    <header
      className={cn(
        "w-full fixed top-0 left-0 z-10 py-3 duration-700 border-b "
      )}
    >
      <nav
        className={cn("container flex justify-between items-center gap-3 px-0")}
      >
        <NavLink
          to="/"
          className="flex items-center gap-2 font-semibold text-xl text-green-500"
        >
          <img src={Logo} className="h-8" />
          Company
        </NavLink>

        <ul className="flex items-center gap-2 font-light text-sm">
          {user && <ProfileOptions />}
          <div className="lg:hidden">
            <MobileSidebar />
          </div>
        </ul>
      </nav>
    </header>
  );
}

function ProfileOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-8 h-8 bg-orange-500">
          <AvatarFallback className="bg-orange-500 text-white">
            R
          </AvatarFallback>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <NavLink
              to="/profile"
              className="w-full inline-flex justify-between"
            >
              Profile
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </NavLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => console.log()}
          className="text-rose-500"
        >
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
