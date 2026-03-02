"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const overlayRef = useRef(null);
  const lineRef = useRef(null);

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
      { opacity: 0.8 },
      { opacity: 0.3, duration: 1.5, ease: "power2.inOut" }
    )
      // Animación del título
      .fromTo(
        titleRef.current,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.2)" },
        "-=1"
      )
      // Animación de la línea decorativa
      .fromTo(
        lineRef.current,
        { width: 0, opacity: 0 },
        { width: "150px", opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      // Animación del subtítulo
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
    >
      {/* Imagen de fondo */}
      <Image
        src="/men/heromen.png"
        alt="Colección hombre YUMA"
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
            {/* Badge de categoría */}
            <span className="inline-block text-accent-gold text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-4">
              Colección 2026
            </span>

            {/* Título principal */}
            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-4"
            >
              HOMBRES
            </h1>

            {/* Línea decorativa */}
            <div
              ref={lineRef}
              className="h-1 bg-accent-gold rounded-full mb-6"
            />

            {/* Subtítulo */}
            <p
              ref={subtitleRef}
              className="text-neutral-gray text-base md:text-lg lg:text-xl max-w-xl"
            >
              Diseñados para el máximo rendimiento. Descubre nuestra colección
              pensada para tu mejor versión.
            </p>

            {/* Botones de acción */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button className="group relative px-8 py-3 bg-accent-gold text-primary-black font-bold rounded-full overflow-hidden hover:bg-accent-gold/90 transition-all duration-300 transform hover:scale-105">
                <span className="relative z-10">Ver colección</span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-20" />
              </button>

              <button className="px-8 py-3 border-2 border-white/30 text-white font-bold rounded-full hover:border-accent-gold hover:text-accent-gold transition-all duration-300">
                Explorar
              </button>
            </div>

            {/* Stats rápidos */}
            <div className="grid grid-cols-3 gap-8 mt-12">
              <div>
                <p className="text-2xl md:text-3xl font-black text-accent-gold">
                  50+
                </p>
                <p className="text-xs md:text-sm text-neutral-gray">
                  Productos
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-black text-accent-gold">
                  15k
                </p>
                <p className="text-xs md:text-sm text-neutral-gray">Clientes</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-black text-accent-gold">
                  4.9
                </p>
                <p className="text-xs md:text-sm text-neutral-gray">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute bottom-10 right-10 w-32 h-32 border-r-2 border-b-2 border-accent-gold/20 rounded-br-3xl" />
      <div className="absolute top-10 left-10 w-32 h-32 border-l-2 border-t-2 border-accent-gold/20 rounded-tl-3xl" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-neutral-gray/60 text-xs uppercase tracking-widest">
            Scroll
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
