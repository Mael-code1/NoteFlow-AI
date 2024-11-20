'use client'
import { Button } from "./button";
import { getNotas, GetNotasEdit } from "../actions/notas/notas";
import { useEffect, useState } from "react";

interface notas {
    id: number;
    title: string;
    content: string;
    color: string | null;
    createdAt: Date;
    completedAt: Date | null;
    isDeleted: boolean;
    userId: number;
}
export default function Notestag() {
    const [notas, setnotas] = useState<notas[]>([]);
    const NotasEdit = async (id:number,title:string,content:string) => {
        await GetNotasEdit({id,title,content})
        console.log(GetNotasEdit({id,content,title}));
    }
    useEffect(() => {
        const fetchNotas = async () => {
            try {
                const notasData = await getNotas()
                setnotas(notasData || [])
            } catch (error) {
                console.log("error no ay anotas", error);
            }
        }
        fetchNotas()
    }, []);
    return (
        <>
            {notas.length > 0 ? (
                notas.map((note) => (
                    <div
                        key={note.id}
                        className="rounded-lg p-4 shadow-sm shadow-purple-800 bg-white hover:border-spacing-8 hover:border-purple-800 hover:shadow-md hover:shadow-purple-950 duration-150"
                    >
                        <h2 className="text-lg font-semibold">{note.title}</h2>
                        <p className="text-sm text-gray-600">{note.content}</p>
                        <p className="text-xs text-gray-500 mt-2">
                            {new Date(note.createdAt).toLocaleDateString()}
                        </p>
                        <div className="flex justify-end mt-4 gap-3">
                            <Button text="Editar" />
                            <Button text="vista" onClick={()=> NotasEdit(note.id,note.title,note.content)} />
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No se encontraron notas.</p>
            )}
        </>
    );
}
