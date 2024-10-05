"use client";

import React, { useState, FormEvent } from "react";
import { Input } from "../components/input";
import { getUser } from "../actions/form"; // Importa la Server Action
import { Button } from "../components/button";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const user = await getUser({ email, password });
      setSuccessMessage("correo correcto");
      console.log("Usuario creado:", user.user, user.token);

      setTimeout(() => router.push("/home"), 2_000);
    } catch (error) {
      setErrorMessage("Error al crear usuario");
      console.error(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center bg-slate-100 p-9 rounded-2xl border-solid gap-9"
      >
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <Input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Ingresa tu correo"
          required
        />
        <Input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
          required
        />
        <Button type="submit" text="Enviar" varible="primary" />
      </form>
    </div>
  );
};

export default FormLogin;
