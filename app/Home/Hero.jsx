"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);
  const starRef = useRef(null);
  const lineRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    // Timeline para animaciones de entrada
    const tl = gsap.timeline();

    // Animación del overlay
    tl.fromTo(
      overlayRef.current,
      { opacity: 1 },
      { opacity: 0, duration: 1.5, ease: "power2.inOut" }
    )
      // Animación de la estrella/logo
      .fromTo(
        starRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.7)" },
        "-=0.8"
      )
      // Animación del texto
      .fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
      )
      // Animación de la línea decorativa
      .fromTo(
        lineRef.current,
        { width: 0, opacity: 0 },
        { width: "6rem", opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      // Animación del indicador scroll
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.2"
      );

    // Efecto de parallax suave al hacer scroll
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (starRef.current) {
        gsap.to(starRef.current, {
          y: scrolled * 0.3,
          scale: 1 + scrolled * 0.0005,
          duration: 0.1,
          ease: "none",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animación continua para la línea (sin CSS global)
  useEffect(() => {
    if (!lineRef.current) return;

    gsap.to(lineRef.current.querySelector(".gold-line-inner"), {
      x: "100%",
      duration: 2,
      repeat: -1,
      ease: "power2.inOut",
      repeatDelay: 0.5,
    });
  }, []);

  // Animación continua para el scroll indicator
  useEffect(() => {
    if (!scrollIndicatorRef.current) return;

    gsap.to(scrollIndicatorRef.current.querySelector(".scroll-dot"), {
      y: 30,
      duration: 1.5,
      repeat: -1,
      ease: "power2.inOut",
      yoyo: true,
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-primary-black"
    >
      {/* Overlay inicial */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-primary-black z-30"
      />

      {/* Gradiente superior */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary-black to-transparent z-20" />

      {/* Gradiente inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-black to-transparent z-20" />

      {/* Imagen principal con efecto de luz */}
      <div
        ref={starRef}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Efecto de glow detrás de la estrella */}
        <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] bg-accent-gold rounded-full blur-3xl opacity-20 animate-pulse" />

        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <Image
            src="/YUMASTAR.png"
            alt="YUMA"
            width={800}
            height={800}
            className="object-contain w-full h-full max-w-[90%] max-h-[90%] md:max-w-[70%] md:max-h-[70%] lg:max-w-[60%] lg:max-h-[60%]"
            priority
          />
        </div>
      </div>

      {/* Texto central con efecto */}
      <div
        ref={textRef}
        className="absolute bottom-[15%] left-0 right-0 text-center z-40"
      >
        <p className="text-neutral-gray text-xs md:text-sm lg:text-base tracking-[0.3em] uppercase mt-4">
          Deportes con estilo
        </p>

        {/* Línea decorativa animada con GSAP */}
        <div
          ref={lineRef}
          className="h-[2px] bg-accent-gold/30 mx-auto mt-8 relative overflow-hidden"
          style={{ width: "6rem" }}
        >
          <div className="gold-line-inner absolute inset-0 bg-accent-gold" />
        </div>
      </div>

      {/* Indicador de scroll minimalista animado con GSAP */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40"
      >
        <div className="flex flex-col items-center space-y-3">
          <span className="text-neutral-gray/60 text-[10px] md:text-xs uppercase tracking-[0.2em]">
            Descubre
          </span>
          <div className="relative w-[2px] h-12 bg-neutral-zinc/30">
            <div className="scroll-dot absolute top-0 left-1/2 transform -translate-x-1/2 w-[2px] h-3 bg-accent-gold" />
          </div>
        </div>
      </div>

      {/* Elemento decorativo sutil en esquinas */}
      <div className="absolute top-12 left-12 w-16 h-16 border-l-2 border-t-2 border-accent-gold/20 rounded-tl-3xl" />
      <div className="absolute bottom-12 right-12 w-16 h-16 border-r-2 border-b-2 border-accent-gold/20 rounded-br-3xl" />
    </section>
  );
};

export default Hero;
