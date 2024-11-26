'use client';

import { Button } from "./button";
import { getNotas, deleteNoteById } from "../actions/notas/notas";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importar useRouter

interface Nota {
    id: number;
    title: string;
    content: string;
    color: string | null;
    createdAt: Date;
    completedAt: Date | null;
    isDeleted: boolean;
    userId: number;
    tags?: string[];
}

export default function Notestag() {
    const [notas, setNotas] = useState<Nota[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter(); // Inicializar useRouter

    // Función para editar nota
    const NotasEdit = (id: number) => {
        router.push(`/home/editor/${id}`);
    };

    // Función para eliminar una nota
    const NotasDelete = async (id: number) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta nota?")) {
            try {
                await deleteNoteById(id);
                // Eliminar la nota de la lista de estado
                setNotas(notas.filter((note) => note.id !== id));
                alert("Nota eliminada con éxito");
            } catch (err) {
                console.error("Error al eliminar la nota:", err);
                setError("No se pudo eliminar la nota.");
            }
        }
    };

    useEffect(() => {
        const fetchNotas = async () => {
            try {
                const notasData = await getNotas();
                setNotas(notasData || []);
            } catch (err) {
                console.error("Error al cargar las notas:", err);
                setError("No se pudieron cargar las notas.");
            }
        };
        fetchNotas();
    }, []);

    return (
        <div className="container mx-auto p-4">
            {error && <p className="text-red-500">{error}</p>}
            {notas.length > 0 ? (
                notas.map((note) => (
                    <div
                        key={note.id}
                        className="rounded-lg p-4 shadow-sm bg-white hover:shadow-lg border border-gray-300 duration-150"
                    >
                        <h2 className="text-lg font-semibold">{note.title}</h2>
                        <p className="text-sm text-gray-600">{note.content}</p>
                        <p className="text-xs text-gray-500 mt-2">
                            {new Date(note.createdAt).toLocaleDateString()}
                        </p>
                        <div className="flex justify-end mt-4 gap-3">
                            <Button text="Editar" onClick={() => NotasEdit(note.id)} />
                            <Button text="Eliminar" onClick={() => NotasDelete(note.id)} />
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No se encontraron notas.</p>
            )}
        </div>
    );
}
