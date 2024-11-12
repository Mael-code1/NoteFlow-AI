'use client'
import Link from "next/link";

export const Navcomponet = () => {
  return (
    <nav className=" flex flex-row justify-center bg-purple-500 h-14 w-full   items-center">
      <ul className="flex flex-row gap-6">
        <li className="">
          <Link href={"/home"}>home</Link>
        </li>
        <li>
          <Link href="/home/editor">editor</Link>
        </li>
        <li className="">login</li>
        <li className="">#</li>
      </ul>
    </nav>
  );
};
