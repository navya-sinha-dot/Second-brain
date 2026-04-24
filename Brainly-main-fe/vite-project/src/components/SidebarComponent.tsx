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
      className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all cursor-pointer group ${
        active 
          ? "bg-neo-light-blue text-neo-blue" 
          : "text-neo-gray hover:bg-gray-50 hover:text-neo-blue"
      }`}
    >
      <div className={`transition-transform group-hover:scale-110 ${active ? "text-neo-blue" : "text-neo-gray group-hover:text-neo-blue"}`}>
        {icon}
      </div>
      <div className="font-semibold text-sm">{text}</div>
    </div>
  );
}
