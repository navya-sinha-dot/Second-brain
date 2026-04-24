import { Brain, GraduationCap, Layout, FileText, Youtube } from "lucide-react";
import { SidebarComponents } from "./SidebarComponent";

export function Sidebar({ onFilter, activeFilter }: { onFilter: (type: string) => void, activeFilter: string }) {
  return (
    <div className="h-screen bg-white border-r border-gray-100 w-64 fixed left-0 top-0 p-6 flex flex-col gap-10 shadow-sm z-20">
      <div className="flex items-center gap-3">
        <div className="text-neo-gray">
          <GraduationCap size={32} />
        </div>
        <h1 className="font-bold text-xl text-neo-text tracking-tight">
          Second Brain
        </h1>
      </div>
      
      <div className="flex flex-col gap-1">
        <SidebarComponents
          text="All Brains"
          icon={<Brain size={20} />}
          active={activeFilter === "all"}
          onClick={() => onFilter("all")}
        />
        <SidebarComponents
          text="Documents"
          icon={<FileText size={20} />}
          active={activeFilter === "PDF"}
          onClick={() => onFilter("PDF")}
        />
        <SidebarComponents
          text="YouTube"
          icon={<Youtube size={20} />}
          active={activeFilter === "Youtube"}
          onClick={() => onFilter("Youtube")}
        />
      </div>
    </div>
  );
}
