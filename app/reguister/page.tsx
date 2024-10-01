"use client";

import React, { useState, FormEvent } from "react";
import { Input } from "../components/input";
import { createUser } from "../actions/form"; // Importa la Server Action
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormLogin from "../login/oage";
import Button from "../components/button";

const FormComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPasword2] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormESvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    if (password == password2) {
      1;
      setSuccessMessage("constraseña correcta");
    } else {
      return;
    }
    try {
      const user = await createUser({ name, email, password });
      setSuccessMessage("Usuario creado con éxito");
      setTimeout(() => router.push("/dasbord/"), 3_000);
      console.log("Usuario creado:", user);
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
        <h1 className="text-start text-5xl text-cyan-500">login</h1>
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
        <Input
          label="contraseña"
          type="password"
          value={password2}
          onChange={e => setPasword2(e.target.value)}
        />
        <Button type="button" text="enter" varible="primary" />
        <Link
          href="/login"
          className="text-black border-b-8 border-slate-700 border-solid b"
        >
          login
        </Link>
      </form>
    </div>
  );
};
export default FormComponent;
