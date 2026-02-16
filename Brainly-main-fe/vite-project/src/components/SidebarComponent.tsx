import { ReactElement } from "react";

export function SidebarComponents({
  icon,
  text,
  onClick,
  active,
}: {
  text: string;
  icon: ReactElement;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 py-3 px-4 transition-all cursor-pointer group neo-border ${active ? "bg-neo-blue border-black" : "border-transparent hover:border-black hover:bg-neo-blue/50"
        }`}
    >
      <div className="text-black group-hover:scale-110 transition-transform">{icon} </div>
      <div className="font-bold uppercase tracking-tight text-sm">{text}</div>
    </div>
  );
}
