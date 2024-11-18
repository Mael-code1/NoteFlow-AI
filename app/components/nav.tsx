import Link from "next/link";
import { Button } from './button';

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


import React from 'react'

export function NavHome() {
  return (
    <header className="h-auto w-auto ">
      <nav className=" flex flex-row  justify-between p-2 ">
        <div className="flex gap-3">
        <Link rel="icono" href={"https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Noto+Sans:wght@400;500;700;900&display=swap"} type="stylesheet"></Link>
        <Link href={"#"} rel="icon" type="">Noteflow</Link>
        </div>
        <ul className="flex flex-row justify-center gap-4  ">
          <li className="flex justify-center items-center"><Link href={"#"}>facture</Link></li>
          <li className="flex justify-center items-center"><Link href={"#"}>princing</Link></li>
          <li className="flex justify-center items-center"><Link href={"#"}>Resources</Link></li>
          <li className="flex justify-center items-center"><Link href={"#"}>community</Link></li>
          <li className="flex flex-row gap-4 justify-center items-center">
            <Button text="sign on" varible="primary"/>
            <Button text="log in" varible="secundary"/>
          </li>
        </ul>
      </nav>
    </header>
  )
}

