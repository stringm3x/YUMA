"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight, FaPalette, FaMagic } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const bgRef = useRef(null);
  const overlayRef = useRef(null);
  const iconsRef = useRef([]);

  useEffect(() => {
    // Timeline de entrada
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animación del fondo
    tl.fromTo(
      bgRef.current,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 0.3, duration: 1.5, ease: "power2.out" }
    )
      // Animación del overlay
      .fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.inOut" },
        "-=1"
      )
      // Animación del título
      .fromTo(
        titleRef.current,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.2)" },
        "-=0.8"
      )
      // Animación del texto
      .fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
      )
      // Animación de los íconos
      .fromTo(
        iconsRef.current,
        { y: 30, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
        },
        "-=0.4"
      )
      // Animación del botón
      .fromTo(
        buttonRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.2)" },
        "-=0.2"
      );
  }, []);

  // Hover effect en el botón
  const handleButtonHover = (isHover) => {
    gsap.to(buttonRef.current, {
      scale: isHover ? 1.05 : 1,
      backgroundColor: isHover ? "#f6c75e" : "#000000",
      color: isHover ? "#000000" : "#FFFFFF",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-primary-black"
    >
      {/* Fondo con textura/imagen */}
      <div ref={bgRef} className="absolute inset-0 opacity-30">
        <Image
          src="/design-bg.jpg"
          alt="Fondo diseño"
          fill
          className="object-cover"
          priority
        />
        {/* Patrón de líneas */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${"#f6c75e"} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            opacity: 0.1,
          }}
        />
      </div>

      {/* Overlay con gradiente */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-br from-primary-black via-primary-black/90 to-accent-gold/10"
      />

      {/* Contenido principal */}
      <div className="relative h-full flex items-center justify-end">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl ml-auto">
            {/* Badge creativo */}
            <div className="flex items-center space-x-2 mb-6">
              <span className="inline-block w-12 h-[2px] bg-accent-gold" />
              <span className="text-accent-gold text-sm font-bold tracking-[0.3em] uppercase">
                CREA TU ESTILO
              </span>
            </div>

            {/* Título principal */}
            <h1
              ref={titleRef}
              className="text-8xl md:text-9xl lg:text-[200px] font-black text-white leading-none mb-8"
            >
              DISEÑA
            </h1>

            {/* Línea decorativa */}
            <div className="w-32 h-1 bg-accent-gold mb-8" />

            {/* Descripción */}
            <p
              ref={textRef}
              className="text-neutral-gray text-xl md:text-2xl lg:text-3xl max-w-2xl mb-12 leading-relaxed"
            >
              Realiza tus pedidos totalmente diseñados y personalizados por ti.
              <span className="block text-accent-gold text-lg md:text-xl mt-4 font-bold">
                Tú decides, nosotros lo hacemos realidad.
              </span>
            </p>

            {/* Features / Íconos */}
            <div className="flex space-x-8 mb-12">
              {[
                { icon: FaPalette, text: "Personaliza colores" },
                { icon: FaMagic, text: "Diseños únicos" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  ref={(el) => (iconsRef.current[idx] = el)}
                  className="flex items-center space-x-3"
                >
                  <div className="w-12 h-12 rounded-full bg-accent-gold/10 flex items-center justify-center">
                    <item.icon className="text-accent-gold text-xl" />
                  </div>
                  <span className="text-white text-sm font-bold">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats rápidos */}
            <div className="grid grid-cols-3 gap-8 mt-16">
              <div>
                <p className="text-3xl md:text-4xl font-black text-accent-gold">
                  100%
                </p>
                <p className="text-xs md:text-sm text-neutral-gray">
                  Personalizable
                </p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-black text-accent-gold">
                  24h
                </p>
                <p className="text-xs md:text-sm text-neutral-gray">
                  Entrega rápida
                </p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-black text-accent-gold">
                  ∞
                </p>
                <p className="text-xs md:text-sm text-neutral-gray">
                  Combinaciones
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute bottom-10 left-10 w-32 h-32 border-l-2 border-b-2 border-accent-gold/20 rounded-bl-3xl" />
      <div className="absolute top-10 right-10 w-32 h-32 border-r-2 border-t-2 border-accent-gold/20 rounded-tr-3xl" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-neutral-gray/60 text-xs uppercase tracking-widest">
            Descubre
          </span>
          <div className="w-[2px] h-12 bg-neutral-zinc/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-accent-gold animate-scroll" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(200%);
          }
        }
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
