"use client";

import React, { useState } from "react";
import {Input} from "../components/input";
const FormComponet = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-slate-100 p-9 rounded-2xl border-solid gap-9">
            <Input
                label="Nombre"
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresa tu nombre"
                required
            />
            <Input
                label="Correo electrónico"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
                required
            />
            <button type="submit">Enviar</button>
        </form>
    );
};

export default FormComponet;
