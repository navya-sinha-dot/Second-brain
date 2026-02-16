import { ReactElement } from "react";

interface Buttonprops {
  variants: "primary" | "secondary" | "danger";
  startIcon?: ReactElement;
  innertext: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const variantStyles = {
  primary: "bg-neo-blue text-black",
  secondary: "bg-neo-white text-black",
  danger: "bg-neo-orange text-white",
};

const defaultStyles =
  "px-6 py-2 neo-btn font-bold flex items-center justify-center cursor-pointer uppercase tracking-tight text-sm";

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
      className={`${variantStyles[variants]} ${defaultStyles} ${disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
    >
      {startIcon && <div className="pr-2">{startIcon}</div>}
      {innertext}
    </button>
  );
}
