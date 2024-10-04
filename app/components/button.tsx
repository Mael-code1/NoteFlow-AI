import { ButtonHTMLAttributes } from "react";

interface propbutton extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  varible?: "primary" | "secundary";
}

export const Button = ({ text, varible = "primary", ...props }: propbutton) => {
  const style = {
    primary: "text-white bg-blue-500 hover:bg-blue-600",
    secundary: "text-black bg-gray-300 hover:bg-gray-400",
  };
  return (
    <button
      {...props}
      className={`px-4 py-2 font-semibold rounded focus:outline-none ${style[varible]}`}
    >
      {text}
    </button>
  );
};
