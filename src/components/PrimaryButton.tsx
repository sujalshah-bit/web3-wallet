import React from "react";
interface DarkSemiRoundedButtonProps {
  text: string;
  bgColor: string;
  textColor: string;
  className?: string; // Optional className prop
  onClick?: () => void; // Add the onClick prop
  disabled?: boolean,
}
const DarkSemiRoundedButton: React.FC<DarkSemiRoundedButtonProps> = ({
  text,
  className,
  onClick,
  bgColor,
  textColor,
  disabled
}) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: textColor }}
      className={` rounded-md inline-flex items-center justify-center py-3 px-7 text-center text-base font-bold hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default DarkSemiRoundedButton;
