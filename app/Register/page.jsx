"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Error desconocido");
      router.push("/Login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="max-w-md mx-auto h-screen p-10 sm:p-20 flex flex-col items-center justify-center gap-7">
      <Image src="/YUMA.png" alt="logo" width={100} height={100} />
      <h1 className="text-3xl mb-4 text-white">Crear Cuenta</h1>
      {error && <p className="text-red mb-4">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col items-center w-full"
      >
        <input
          name="firstName"
          type="text"
          placeholder="Nombre"
          className="w-full p-2 border rounded bg-gray text-white"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <input
          name="lastName"
          type="text"
          placeholder="Apellido"
          className="w-full p-2 border rounded bg-gray text-white"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded bg-gray text-white"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 border rounded bg-gray text-white"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded-full font-bold"
        >
          Crear cuenta
        </button>
        <p className="text-gray flex gap-2">
          ¿Ya tienes cuenta?
          <Link href="/Login">
            <span className="text-white underline">Inicia sesión</span>
          </Link>
        </p>
      </form>
    </section>
  );
}
