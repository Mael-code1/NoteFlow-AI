import { ButtonHTMLAttributes } from "react";
import Link from 'next/link';

interface propbutton extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  varible?: "primary" | "secundary";
}

export const Button = ({ text, varible = "primary", ...props }: propbutton) => {
  const style = {
    primary: "text-white bg-purple-800 hover:bg-purple-400",
    secundary: "text-black bg-gray-300 hover:bg-gray-400",
  };
  return (
    <button
      {...props}
      className={`px-4 py-2 font-semibold rounded focus:outline-none hover:border-none hover:shadow-md hover:shadow-purple-500 hover:duration-150 ${style[varible]}`}
    >
      {text}
    </button>
  );

};


interface LinkrouterPathprops {
  text:string
  href:string
  primary?: "primary" | "secundary"

}

export const Linkrouter = ({text,href,primary="primary",...props}:LinkrouterPathprops) => {
  const style = {
    primary:"text-white bg-purple-800 hover:bg-purple-400",
    secundary:"text-black bg-gray-300 hover:bg-gray-400"
  }
  return(
    <>
    <Link href={href}
      {...props}
      className={`px-4 py-2 font-semibold rounded focus:outline-none hover:border-none hover:shadow-md hover:shadow-purple-500 hover:duration-150 ${style[primary]}`}
    >
      {text}
    </Link>
    </>
  )
}