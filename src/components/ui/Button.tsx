import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost";
}

export const Button = ({
  children,
  className = "",
  variant = "default",
  ...props
}: ButtonProps) => {
  const base = "px-4 py-2 rounded font-medium transition";
  const variants = {
    default: "hover:bg-yellow-500 cursor-pointer",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 cursor-pointer",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
