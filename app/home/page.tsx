import Link from "next/link";
import React from "react";
import { Button } from "../components/button";
import Image from "next/image";

export default function page() {
  const notes = [
    {
      id: 1,
      title: "primera Nota",
      description: "describir",
      date: "2024-10-27",
    },
    {
      id: 2,
      title: "Segunda Nota",
      description: "Descripción breve de la segunda nota...",
      date: "2024-10-27",
    },
  ];
  return (
    <div className="flex flex-col p-6 ">
      <h1 className="text-2xl font-bold mb-4">notas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map(notes => (
          <div
            key={notes.id}
            className="rounded-lg p-4 shadow-sm shadow-purple-800 bg-white hover:border-spacing-8 hover:border-purple-800 hover:shadow-md hover:shadow-purple-950"
          >
            <h2 className="text-lg font-semibold">{notes.title}</h2>
            <p className="text-sm text-gray-600">{notes.description}</p>
            <p className="text-xs text-gray-500 mt-2">{notes.date}</p>
            <div className="flex justify-end mt-4">
              <Button text="Editar" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
