import { BrainIcon } from "../Icons/BrainIcon";
import { DocumentIcon } from "../Icons/DocumentIcon";
import { YoutubeIcon } from "../Icons/Youtubeicon";
import { SidebarComponents } from "./SidebarComponent";

export function Sidebar({ onFilter, activeFilter }: { onFilter: (type: string) => void, activeFilter: string }) {
  return (
    <div className="h-screen bg-neo-white neo-border border-l-0 border-t-0 border-b-0 w-64 fixed left-0 top-0 p-6 flex flex-col gap-8 shadow-neo">
      <div className="flex items-center gap-2">
        <div className="p-2 neo-border bg-neo-yellow">
          <BrainIcon />
        </div>
        <h1 className="font-black text-xl tracking-tighter uppercase whitespace-nowrap pr-3">
          Second Brain
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <SidebarComponents
          text="All Brains"
          icon={<BrainIcon />}
          active={activeFilter === "all"}
          onClick={() => onFilter("all")}
        />
        <SidebarComponents
          text="Documents"
          icon={<DocumentIcon />}
          active={activeFilter === "PDF"}
          onClick={() => onFilter("PDF")}
        />
        <SidebarComponents
          text="YouTube"
          icon={<YoutubeIcon />}
          active={activeFilter === "Youtube"}
          onClick={() => onFilter("Youtube")}
        />
      </div>
    </div>
  );
}
