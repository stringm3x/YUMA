"use client";

import ProductCard from "../components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DropClient({ products }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const monthRef = useRef(null);
  const imageRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Timeline principal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animación de la imagen
    tl.fromTo(
      imageRef.current,
      { scale: 0.8, opacity: 0, rotation: -5 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.2,
        ease: "back.out(1.2)",
      }
    )
      // Animación del título principal
      .fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      // Animación del mes
      .fromTo(
        monthRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      // Animación de las cards
      .fromTo(
        cardsRef.current,
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
        },
        "-=0.2"
      );

    // Efecto de parallax en la imagen al hacer scroll
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rect = sectionRef.current?.getBoundingClientRect();

      if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
        const progress =
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        gsap.to(imageRef.current, {
          y: progress * 100,
          scale: 1 + progress * 0.1,
          duration: 0.1,
          ease: "none",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Función para scroll horizontal con rueda del mouse
  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero del Drop */}
        <div className="relative mb-20">
          {/* Imagen decorativa */}
          <div ref={imageRef} className="relative w-full max-w-3xl mx-auto">
            <Image
              src="/dropimg.png"
              width={1000}
              height={1000}
              alt="YUMA Drop"
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority
            />

            {/* Overlay con gradiente */}
            <div className="absolute inset-0" />
          </div>

          {/* Texto superpuesto */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-tighter mb-4"
            >
              NUEVO DROP
            </h1>
            <div className="relative">
              <h2
                ref={monthRef}
                className="text-2xl md:text-4xl lg:text-5xl text-accent-gold font-bold"
              >
                AGOSTO 2026
              </h2>
              {/* Línea decorativa */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-accent-gold to-accent-purple rounded-full" />
            </div>
          </div>

          {/* Badge flotante */}
          <div className="absolute -top-4 -right-4 md:top-0 md:right-10 animate-bounce-slow">
            <div className="bg-accent-red text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg transform rotate-6">
              <span className="tracking-wider">LIMITADO</span>
            </div>
          </div>
        </div>

        {/* Título de la colección */}
        <div className="flex items-center justify-between mb-8 px-4">
          <div>
            <h3 className="text-neutral-gray text-sm uppercase tracking-[0.3em]">
              Colección
            </h3>
            <h2 className="text-white text-2xl md:text-3xl font-bold">
              Drop de Agosto
            </h2>
          </div>

          {/* Indicador de scroll horizontal */}
          <div className="hidden md:flex items-center space-x-2 text-neutral-gray">
            <span className="text-xs uppercase tracking-wider">Desliza</span>
            <div className="flex space-x-1">
              <div className="w-8 h-[2px] bg-accent-gold/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-accent-gold animate-slide" />
              </div>
              <svg
                className="w-4 h-4 text-accent-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Contenedor de cards con scroll horizontal */}
        <div
          ref={cardsContainerRef}
          className="flex space-x-6 overflow-x-auto pb-8 px-4 no-scrollbar snap-x snap-mandatory"
          style={{ scrollBehavior: "smooth" }}
        >
          {products.map((product, idx) => {
            // Badges según posición
            let badge = "";
            if (idx === 0) badge = "NOVEDAD";
            else if (idx === 1) badge = "MÁS VENDIDO";
            else if (idx === 2) badge = "EDICIÓN LIMITADA";

            return (
              <div
                key={product.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[320px] snap-start"
              >
                <ProductCard product={product} badge={badge} />
              </div>
            );
          })}
        </div>

        {/* Indicadores de paginación */}
        <div className="flex justify-center space-x-2 mt-6">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const container = cardsContainerRef.current;
                const cardWidth = container?.children[0]?.clientWidth || 320;
                container?.scrollTo({
                  left: idx * (cardWidth + 24),
                  behavior: "smooth",
                });
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === 0
                  ? "w-8 bg-accent-gold"
                  : "bg-neutral-zinc/50 hover:bg-neutral-zinc"
              }`}
              aria-label={`Ir a producto ${idx + 1}`}
            />
          ))}
        </div>

        {/* Botón para ver toda la colección */}
        <div className="flex justify-center mt-12">
          <Link
            href="/Drop"
            className="group relative inline-flex items-center space-x-3 px-8 py-4 bg-transparent border-2 border-accent-gold/50 hover:border-accent-gold rounded-full overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10 text-white font-bold uppercase tracking-wider">
              Ver colección completa
            </span>
            <svg
              className="relative z-10 w-5 h-5 text-accent-gold transform group-hover:translate-x-2 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>

            {/* Efecto hover */}
            <div className="absolute inset-0 bg-accent-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-slide {
          animation: slide 2s ease-in-out infinite;
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0) rotate(6deg);
          }
          50% {
            transform: translateY(-10px) rotate(6deg);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
