import Link from "next/link";
import React from "react";
import { Button } from "../components/button";
import Image from "next/image";
import Notestag from '../components/Notestag';

export default function page() {

  return (
    <div className="flex flex-col p-6 ">
      <h1 className="text-2xl font-bold mb-4">notas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Notestag/>
      </div>
    </div>
  );
}
