"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="max-w-md mx-auto h-screen p-10 sm:p-20 flex flex-col items-center justify-center gap-5">
      <Image src="/YUMA.png" alt="logo" width={100} height={100} />
      <h1 className="text-3xl mb-4 text-white">Iniciar Sesión</h1>
      {error && <p className="text-red mb-4">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col items-center w-full"
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded bg-gray text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 border rounded bg-gray text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Link href="/Forgot-Password" className="justify-self-center">
          <span className="underline text-white">
            ¿Haz olvidado tu contraseña?
          </span>
        </Link>

        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded-full font-bold"
        >
          Entrar
        </button>

        <h1 className="text-gray flex flex-row gap-2">
          ¿No tienes cuenta?
          <Link href="/Register" className="justify-self-center">
            <span className="text-white">Crear cuenta</span>
          </Link>
        </h1>
      </form>
    </section>
  );
}
