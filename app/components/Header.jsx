"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaTimes, FaUser, FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  { label: "Inicio", href: "/" },
  { label: "Hombres", href: "/Men" },
  { label: "Mujeres", href: "/Women" },
  { label: "Diseña", href: "/Design" },
  { label: "Nosotros", href: "/About" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { lines } = useCart();

  const { user, logout } = useAuth();
  const itemCount = lines.reduce((total, { quantity }) => total + quantity, 0);

  // Navegación protegida para el carrito:
  const handleCartClick = (e) => {
    if (!user) {
      e.preventDefault();
      router.push("/Login");
    }
  };

  return (
    <header className="fixed top-3 left-0 right-0 z-50 text-white flex items-center justify-between px-8 py-4">
      {/* Botón hamburguesa */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-white"
        aria-label="Abrir menú"
      >
        <FaBars size={30} />
      </button>

      {/* Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Image src="/YUMA.png" alt="logo YUMA" width={60} height={60} />
      </div>

      {/* Íconos de usuario y carrito */}
      <div className="flex items-center space-x-6">
        {user ? (
          <div className="flex items-center gap-2">
            <span className="hidden sm:block text-xs">{user.email}</span>
            <button
              onClick={logout}
              className="text-white hover:text-red"
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <FaUser size={24} />
            </button>
          </div>
        ) : (
          <Link
            href="/Login"
            className="flex items-center"
            aria-label="Iniciar sesión"
          >
            <FaUser size={24} />
          </Link>
        )}

        <Link href="/Cart" onClick={handleCartClick}>
          <div className="relative">
            <FaShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-white text-black rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* Menú lateral */}
      <div
        className={`fixed inset-0 bg-bg text-left transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Botón cerrar */}
        <div className="flex justify-start p-8">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-3xl"
            aria-label="Cerrar menú"
          >
            <FaTimes />
          </button>
        </div>

        {/* Menú */}
        <nav className="mt-12 flex flex-col items-start space-y-8 pl-10">
          {menuItems.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`uppercase font-bold text-4xl md:text-6xl transition-colors ${
                  active
                    ? "text-red"
                    : "text-gray hover:text-red hover:scale-110"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
