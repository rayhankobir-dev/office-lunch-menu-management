import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, MenuIcon } from "lucide-react";
import Logo from "@/assets/react.svg";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth >= 1024 ? setOpen(false) : setOpen(open);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon size={30} />
        </SheetTrigger>
        <SheetContent side="right" className="w-full !px-0">
          <div className="-translate-y-14 h-screen overflow-hidden overflow-y-scroll space-y-4 py-8 ">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="w-full h-14 inline-flex items-center gap-2 border-b px-4 text-green-600"
            >
              <img src={Logo} alt="Travella" />
              <p className="italic font-semibold text-lg">Company</p>
            </Link>
            <div className="h-[80%] overflow-y-scroll flex flex-col justify-between py-2 px-4">
              <div className="">
                <NavLink
                  end={true}
                  to="/"
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium hover:text-green-600",
                      isActive ? "text-green-700" : "text-black"
                    )
                  }
                >
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </NavLink>

                <NavLink
                  end={true}
                  to="/menus"
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium hover:text-green-600",
                      isActive ? "text-green-700" : "text-black"
                    )
                  }
                >
                  <span>Menus</span>
                </NavLink>

                <NavLink
                  end={true}
                  to="/options"
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium hover:text-green-600",
                      isActive ? "text-green-700" : "text-black"
                    )
                  }
                >
                  <span>Options</span>
                </NavLink>
                <NavLink
                  end={true}
                  to="/my-choices"
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium hover:text-green-600",
                      isActive ? "text-green-700" : "text-black"
                    )
                  }
                >
                  <span>My Choices</span>
                </NavLink>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
