"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // '', 'sent', 'error'
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setError("");
    try {
      const res = await fetch("/api/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Error desconocido");
      setStatus("sent");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  return (
    <section className="max-w-md mx-auto h-screen p-10 sm:p-20 flex flex-col items-center justify-center gap-5">
      <Image src="/YUMA.png" alt="logo" width={100} height={100} />
      <h1 className="text-3xl mb-4 text-white">Recuperar Contraseña</h1>

      {status === "sent" ? (
        <p className="text-green-400 text-center">
          Si existe esa cuenta, envíamos un correo para restablecer tu
          contraseña.
        </p>
      ) : (
        <>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col items-center w-full"
          >
            <input
              type="email"
              placeholder="Tu email"
              className="w-full p-2 border rounded bg-gray text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-white text-black py-2 rounded-full font-bold"
            >
              Enviar enlace
            </button>
          </form>
        </>
      )}

      <p className="text-gray flex gap-2">
        <Link href="/Login">
          <span className="text-white underline">Volver al login</span>
        </Link>
      </p>
    </section>
  );
}
