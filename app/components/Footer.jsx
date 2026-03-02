"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Animación de entrada cuando el footer es visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footer = document.getElementById("main-footer");
    if (footer) observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de suscripción
    alert(`¡Gracias por suscribirte ${email}!`);
    setEmail("");
  };

  return (
    <footer
      id="main-footer"
      className="w-full text-white bg-gradient-to-b from-primary-black to-neutral-black relative overflow-hidden"
    >
      {/* Línea decorativa superior con gradiente */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-gold via-accent-purple to-accent-blue" />

      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent-purple rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-blue rounded-full filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Columna izquierda - Redes y contacto */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <h3 className="text-accent-gold font-bold text-lg mb-6 tracking-wider">
                CONECTA CON NOSOTROS
              </h3>
              <div className="space-y-4">
                {/* Instagram */}
                <a
                  href="https://instagram.com/YUMA_EQUIPMENT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-neutral-zinc/20 flex items-center justify-center group-hover:bg-accent-gold/20 transition-all duration-300">
                    <Instagram
                      size={18}
                      className="text-neutral-gray group-hover:text-accent-gold transition-colors"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-gray">Instagram</span>
                    <span className="text-white group-hover:text-accent-gold transition-colors">
                      @YUMA_EQUIPMENT
                    </span>
                  </div>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com/YUMA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-neutral-zinc/20 flex items-center justify-center group-hover:bg-accent-gold/20 transition-all duration-300">
                    <Facebook
                      size={18}
                      className="text-neutral-gray group-hover:text-accent-gold transition-colors"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-gray">Facebook</span>
                    <span className="text-white group-hover:text-accent-gold transition-colors">
                      /YUMA
                    </span>
                  </div>
                </a>

                {/* Twitter/X */}
                <a
                  href="https://twitter.com/YUMA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-neutral-zinc/20 flex items-center justify-center group-hover:bg-accent-gold/20 transition-all duration-300">
                    <Twitter
                      size={18}
                      className="text-neutral-gray group-hover:text-accent-gold transition-colors"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-gray">Twitter</span>
                    <span className="text-white group-hover:text-accent-gold transition-colors">
                      @YUMA
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Información de contacto */}
            <div>
              <h3 className="text-accent-gold font-bold text-lg mb-6 tracking-wider">
                CONTACTO
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Phone size={18} className="text-neutral-gray mt-1" />
                  <div>
                    <p className="text-sm text-neutral-gray">Teléfono</p>
                    <a
                      href="tel:+525543440865"
                      className="text-white hover:text-accent-gold transition-colors"
                    >
                      +52 55 4344 0865
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail size={18} className="text-neutral-gray mt-1" />
                  <div>
                    <p className="text-sm text-neutral-gray">Email</p>
                    <a
                      href="mailto:yuma@outlook.com"
                      className="text-white hover:text-accent-gold transition-colors"
                    >
                      yuma@outlook.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin size={18} className="text-neutral-gray mt-1" />
                  <div>
                    <p className="text-sm text-neutral-gray">Ubicación</p>
                    <p className="text-white">Ciudad de México, MX</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna centro - Logo y newsletter */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-8">
            {/* Logo con animación */}
            <div className="relative group">
              <div className="absolute inset-0 bg-accent-gold rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              <Image
                src="/YUMA.png"
                width={140}
                height={140}
                alt="YUMA Logo"
                className="relative z-10 transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Columna derecha - Páginas */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <h3 className="text-accent-gold font-bold text-lg mb-6 tracking-wider">
                PÁGINAS
              </h3>
              <nav className="grid grid-cols-2 gap-4">
                {[
                  { label: "Inicio", href: "/" },
                  { label: "Hombres", href: "/Men" },
                  { label: "Mujeres", href: "/Women" },
                  { label: "Diseña", href: "/Design" },
                  { label: "Nosotros", href: "/About" },
                  { label: "Contacto", href: "/Contact" },
                ].map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group flex items-center space-x-2 text-neutral-gray hover:text-accent-gold transition-colors"
                  >
                    <ChevronRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <span>{label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Aviso de privacidad y términos */}
            <div className="space-y-3">
              <Link
                href="/Privacy"
                className="block text-neutral-gray hover:text-accent-gold transition-colors"
              >
                Aviso de privacidad
              </Link>
              <Link
                href="/Terms"
                className="block text-neutral-gray hover:text-accent-gold transition-colors"
              >
                Términos y condiciones
              </Link>
              <Link
                href="/Returns"
                className="block text-neutral-gray hover:text-accent-gold transition-colors"
              >
                Devoluciones y reembolsos
              </Link>
            </div>
          </div>
        </div>

        {/* Barra inferior con copyright */}
        <div className="mt-16 pt-8 border-t border-neutral-zinc/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-gray/60 text-sm">
              © {new Date().getFullYear()} YUMA. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <span className="text-neutral-gray/40 text-xs">
                Diseñado en México
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
