import { ReactElement } from "react";

export function SidebarComponents({
  icon,
  text,
}: {
  text: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex py-1 hover:bg-blue-100 rounded-md max-w-48 text-blue-700">
      <div className="pr-2 ">{icon} </div>
      <div>{text}</div>
    </div>
  );
}
