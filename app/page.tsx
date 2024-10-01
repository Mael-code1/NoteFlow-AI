"use client";

import Image from "next/image";
import Button from "./components/button";
const Home = () => {
  return (
    <div className="h-full w-screen">
      <section className=" bg-slate-200 h-56 m-1.5  flex flex-row justify-between items-center ">
        <div className="w-screen h-44 flex-col justify-center  items-center  ">
          <h1 className="text-black text-center">hola mundo</h1>
        </div>
        <main className="w-screen h-44  flex justify-center">
          <Image
            src={"next.svg"}
            width={100}
            height={100}
            alt="imagen de referencia 1"
          />
        </main>
        <Button type="button" text="acceder" />
      </section>
    </div>
  );
};

export default Home;
