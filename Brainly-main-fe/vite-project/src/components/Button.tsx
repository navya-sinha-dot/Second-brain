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
  primary: "bg-neo-blue text-white hover:bg-[#153461] shadow-sm",
  secondary: "bg-white text-neo-blue border border-neo-blue hover:bg-[#f0f4f8]",
  danger: "bg-neo-orange text-white hover:opacity-90",
};

const defaultStyles =
  "px-6 py-2.5 neo-btn font-semibold flex items-center justify-center cursor-pointer transition-all duration-300 text-sm";

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
