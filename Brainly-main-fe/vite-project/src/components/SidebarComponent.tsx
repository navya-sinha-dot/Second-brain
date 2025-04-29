import { ReactElement } from "react";

export function SidebarComponents({
  icon,
  text,
}: {
  text: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex py-1 hover:bg-gray-200 rounded-md max-w-48">
      <div className="pr-2 ">{icon} </div>
      <div>{text}</div>
    </div>
  );
}
