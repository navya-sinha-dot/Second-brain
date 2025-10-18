import { ReactElement } from "react";

interface Buttonprops {
  variants: "primary" | "secondary";
  startIcon?: ReactElement;
  innertext: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const variantStyles = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-blue-100 text-blue-700 hover:bg-blue-200",
};

const defaultStyles =
  "px-4 py-2 rounded-xl font-normal flex items-center cursor-pointer";

export function Button({
  variants,
  innertext,
  startIcon,
  onClick,
  disabled = false,
  className = "",
}: Buttonprops) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variantStyles[variants]} ${defaultStyles} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <div className="pr-2 ">{startIcon}</div>
      {innertext}
    </button>
  );
}
