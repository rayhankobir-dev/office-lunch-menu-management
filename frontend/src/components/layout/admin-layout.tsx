import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "./navbar";
import { Sidebar } from "./aside";
import { Outlet } from "react-router-dom";

export function AdminLayout() {
  return (
    <main className="h-screen w-screen overflow-hidden">
      <Navbar />
      <div className="h-full w-full fixed top-14">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={18}>
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={82}>
            <ScrollArea className="h-full">
              <Outlet />
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}
