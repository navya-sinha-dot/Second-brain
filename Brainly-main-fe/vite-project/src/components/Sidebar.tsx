import { BrainIcon } from "../Icons/BrainIcon";
import { TwitterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/Youtubeicon";
import { SidebarComponents } from "./SidebarComponent";

export function Sidebar() {
  return (
    <div className="h-screen bg-linear-to-b from-slate-100 to-purple-300 border-r w-72 position-fixed left-0 top-0 pl-4">
      <h1 className="font-bold text-2xl flex items-center pt-4 ">
        <div className="pr-2 text-purple-600">{<BrainIcon />}</div>SECOND BRAIN
      </h1>
      <div className="pt-4">
        <div className="pb-4 cursor-pointer">
          <SidebarComponents text="Twitter" icon={<TwitterIcon />} />
        </div>
        <div className="pb-4 cursor-pointer">
          <SidebarComponents text="Youtube" icon={<YoutubeIcon />} />
        </div>
      </div>
    </div>
  );
}
