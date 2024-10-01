"use client";

import React, { useState, FormEvent } from "react";
import { Input } from "../input";
import { createUser } from "../../actions/form"; // Importa la Server Action

const FormLogin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const user = await createUser({ name, email, password });
      setSuccessMessage("Usuario creado con éxito");
      console.log("Usuario creado:", user);
    } catch (error) {
      setErrorMessage("Error al crear usuario");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center bg-slate-100 p-9 rounded-2xl border-solid gap-9"
    >
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <Input
        label="Nombre"
        value={name}
        type="text"
        onChange={e => setName(e.target.value)}
        placeholder="Ingresa tu nombre"
        required
      />
      <Input
        label="Correo electrónico"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Ingresa tu correo"
        required
      />
      <Input
        label="Contraseña"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Ingresa tu contraseña"
        required
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormLogin;
