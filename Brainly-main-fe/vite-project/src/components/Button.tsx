import { ReactElement } from "react";

interface Buttonprops {
  variants: "primary" | "secondary";

  startIcon?: ReactElement;
  innertext: string;
  onClick?: () => void;
}

const variantStyles = {
  primary: "bg-purple-600 text-white ",
  secondary: "bg-purple-200 text-purple-600",
};

const defaultStyles =
  "px-4 py-2 rounded-xl font-normal flex items-center cursor-pointer";

export function Button({
  variants,
  innertext,
  startIcon,
  onClick,
}: Buttonprops) {
  return (
    <button
      onClick={onClick}
      className={`${variantStyles[variants]} ${defaultStyles}`}>
      <div className="pr-2 ">{startIcon}</div>
      {innertext}
    </button>
  );
}
