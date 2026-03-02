"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Add = () => {
  const sectionRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const buttonRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    // Timeline de entrada
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animación del overlay
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.inOut" }
    )
      // Animación de los textos (uno por uno)
      .fromTo(
        text1Ref.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(
        text2Ref.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        text3Ref.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      // Animación del botón
      .fromTo(
        buttonRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.2)" },
        "-=0.4"
      );
  }, []);

  // Hover effect en el botón
  const handleButtonHover = (isHover) => {
    gsap.to(buttonRef.current, {
      scale: isHover ? 1.05 : 1,
      backgroundColor: isHover ? "#f6c75e" : "#FFFFFF",
      color: isHover ? "#000000" : "#000000",
      boxShadow: isHover
        ? "0 20px 40px rgba(246,199,94,0.3)"
        : "0 10px 20px rgba(0,0,0,0.2)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[600px] md:h-[800px] overflow-hidden"
    >
      {/* Imagen de fondo */}
      <Image
        src="/women/addwomen.png"
        alt="Nuevas promociones mujer YUMA"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay con gradiente */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-r from-primary-black via-primary-black/80 to-transparent"
      />

      {/* Contenido */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            {/* Badge de promoción */}
            <span className="inline-block bg-accent-red text-white text-sm font-bold px-4 py-2 rounded-full mb-6">
              🔥 OFERTAS EXCLUSIVAS
            </span>

            {/* Textos principales */}
            <div className="space-y-2">
              <h1
                ref={text1Ref}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white"
              >
                DESCUBRE
              </h1>
              <h1
                ref={text2Ref}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white"
              >
                NUEVAS
              </h1>
              <h1
                ref={text3Ref}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black"
              >
                <span className="text-accent-gold">PROMOCIONES</span>
              </h1>
            </div>

            {/* Descripción */}
            <p className="text-neutral-gray text-base md:text-lg mt-6 max-w-xl">
              Hasta 50% de descuento en leggins, tops y conjuntos. La colección
              que estabas esperando está aquí.
            </p>

            {/* Botón y detalles */}
            <div className="flex items-center space-x-6 mt-8">
              <button
                ref={buttonRef}
                onMouseEnter={() => handleButtonHover(true)}
                onMouseLeave={() => handleButtonHover(false)}
                className="px-10 py-4 bg-white text-primary-black font-bold rounded-full text-lg shadow-xl transform transition-all duration-300"
              >
                Ver ofertas
              </button>

              {/* Timer (opcional) */}
              <div className="flex items-center space-x-2">
                <div className="text-center">
                  <span className="text-2xl font-black text-accent-gold">
                    03
                  </span>
                  <span className="text-neutral-gray text-xs block">Días</span>
                </div>
                <span className="text-accent-gold text-2xl">:</span>
                <div className="text-center">
                  <span className="text-2xl font-black text-accent-gold">
                    12
                  </span>
                  <span className="text-neutral-gray text-xs block">Horas</span>
                </div>
                <span className="text-accent-gold text-2xl">:</span>
                <div className="text-center">
                  <span className="text-2xl font-black text-accent-gold">
                    45
                  </span>
                  <span className="text-neutral-gray text-xs block">Min</span>
                </div>
              </div>
            </div>

            {/* Código de descuento */}
            <div className="mt-8 inline-block border-2 border-accent-gold/30 rounded-full px-6 py-2">
              <span className="text-neutral-gray text-sm">Código: </span>
              <span className="text-accent-gold font-bold text-lg">
                YUMAWOMAN
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute bottom-10 right-10 w-32 h-32 border-r-2 border-b-2 border-accent-gold/20 rounded-br-3xl" />
      <div className="absolute top-10 left-10 w-32 h-32 border-l-2 border-t-2 border-accent-gold/20 rounded-tl-3xl" />

      {/* Badge flotante de descuento */}
      <div className="absolute top-20 right-20 hidden lg:block">
        <div className="relative">
          <div className="w-32 h-32 bg-accent-red rounded-full flex items-center justify-center transform rotate-12 animate-pulse">
            <div className="text-center">
              <span className="text-white text-sm font-bold block">HASTA</span>
              <span className="text-white text-4xl font-black">50%</span>
              <span className="text-white text-sm font-bold block">OFF</span>
            </div>
          </div>
          <div className="absolute inset-0 bg-accent-red rounded-full blur-xl opacity-50" />
        </div>
      </div>
    </section>
  );
};

export default Add;
