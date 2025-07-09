"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaUser, FaShoppingCart } from "react-icons/fa";
import Image from "next/image";

const menuItems = [
  { label: "Inicio", href: "/" },
  { label: "Hombres", href: "/Services" },
  { label: "Mujeres", href: "/Proyects" },
  { label: "Personalizados", href: "/Us" },
  { label: "Diseña", href: "/Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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

      {/* Logo centrado */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Image src="/YUMA.png" alt="logo YUMA" width={60} height={60} />
      </div>

      {/* Íconos de usuario y carrito */}
      <div className="flex items-center space-x-6">
        <FaUser size={24} />
        <div className="relative">
          <FaShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 text-xs bg-white text-black rounded-full w-4 h-4 flex items-center justify-center">
            0
          </span>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black text-left transform ${
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
