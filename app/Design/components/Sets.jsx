"use client";

import ProductCard from "../../components/ProductCard";
import Link from "next/link";
import { getAllProducts } from "../../../lib/shopify";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight, FaArrowLeft, FaPalette, FaMagic } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Sets() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const progressBarRef = useRef(null);
  const badgeRef = useRef(null);

  // Cargar productos personalizables
  useEffect(() => {
    async function loadProducts() {
      try {
        const allProducts = await getAllProducts(8);
        const count = 4;

        const customProducts = allProducts.filter((p) =>
          p.options?.some(
            (opt) =>
              opt.name.toLowerCase() === "personalizable" &&
              opt.values.some((val) => val.toLowerCase() === "custom")
          )
        );

        console.log(
          allProducts.map((p) => ({
            title: p.title,
            options: p.options,
            variants: p.variants,
          }))
        );

        const displayProducts = customProducts.slice(0, count);
        setProducts(displayProducts);
      } catch (error) {
        console.error("Error cargando productos:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Animación de entrada
  useEffect(() => {
    if (loading) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    )
      .fromTo(
        badgeRef.current,
        { width: 0, opacity: 0 },
        { width: "100px", opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        cardsRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
        },
        "-=0.3"
      );
  }, [loading, products]);

  // Scroll horizontal con rueda del mouse
  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container || loading || products.length === 0) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;

        // Actualizar barra de progreso
        const maxScroll = container.scrollWidth - container.clientWidth;
        const progress = (container.scrollLeft / maxScroll) * 100;
        gsap.to(progressBarRef.current, {
          width: `${progress}%`,
          duration: 0.1,
          ease: "none",
        });
      }
    };

    const handleScroll = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const progress = (container.scrollLeft / maxScroll) * 100;
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.1,
        ease: "none",
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("scroll", handleScroll);
    };
  }, [loading, products]);

  // Navegación
  const scroll = (direction) => {
    const container = cardsContainerRef.current;
    const scrollAmount = 320;
    container.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
  };

  // Skeletons mientras carga
  if (loading) {
    return (
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                ELIGE UN CONJUNTO
              </h2>
            </div>
          </div>

          <div className="flex space-x-6 overflow-x-auto pb-8 no-scrollbar">
            {[1, 2, 3, 4].map((_, idx) => (
              <div key={idx} className="flex-shrink-0 w-[280px] animate-pulse">
                <div className="aspect-square bg-neutral-800 rounded-2xl" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-neutral-800 rounded w-3/4" />
                  <div className="h-4 bg-neutral-800 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Si no hay productos personalizables
  if (products.length === 0) {
    return (
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              ELIGE UN CONJUNTO
            </h2>
            <div className="w-20 h-1 bg-accent-gold mx-auto rounded-full" />
          </div>

          <div className="flex flex-col items-center justify-center py-20">
            <FaPalette className="text-accent-gold text-6xl mb-6 opacity-50" />
            <p className="text-neutral-gray text-xl text-center">
              No hay conjuntos personalizables aún.
            </p>
            <p className="text-neutral-gray text-base text-center mt-2">
              Pronto tendremos nuevas opciones para ti.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con título y navegación */}
        <div
          ref={titleRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8"
        >
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <FaMagic className="text-accent-gold text-2xl" />
              <span className="text-accent-gold text-sm font-bold tracking-[0.2em] uppercase">
                PERSONALIZA
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              ELIGE UN CONJUNTO
            </h2>
            <div
              ref={badgeRef}
              className="w-24 h-1 bg-accent-gold mt-4 rounded-full"
            />
          </div>

          {/* Botones de navegación desktop */}
          {products.length > 1 && (
            <div className="hidden md:flex space-x-3 mt-4 md:mt-0">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-accent-gold/50 text-neutral-gray hover:text-accent-gold flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-accent-gold/50 text-neutral-gray hover:text-accent-gold flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>

        {/* Descripción */}
        <p className="text-neutral-gray text-base md:text-lg mb-8 max-w-2xl">
          Crea tu propio estilo. Todos nuestros conjuntos son 100%
          personalizables en colores, tallas y diseños.
        </p>

        {/* Contenedor de cards con scroll horizontal */}
        <div className="relative">
          <div
            ref={cardsContainerRef}
            className="flex space-x-6 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory"
            style={{ scrollBehavior: "smooth" }}
          >
            {products.map((product, idx) => {
              // Badge según posición
              let badge = "";
              let badgeColor = "";

              if (idx === 0) {
                badge = "🔥 MÁS VENDIDO";
                badgeColor = "bg-accent-gold text-primary-black";
              } else if (idx === 1) {
                badge = "✨ NUEVO DISEÑO";
                badgeColor = "bg-accent-purple text-white";
              } else if (idx === 2) {
                badge = "⭐ FAVORITO";
                badgeColor = "bg-accent-blue text-white";
              } else if (idx === 3) {
                badge = "💫 EDICIÓN LIMITADA";
                badgeColor = "bg-accent-green text-primary-black";
              }

              return (
                <div
                  key={product.id}
                  ref={(el) => (cardsRef.current[idx] = el)}
                  className="flex-shrink-0 w-[280px] sm:w-[300px] snap-start relative group"
                >
                  {/* Número de posición */}
                  <div className="absolute -top-3 -left-3 z-20">
                    <div className="relative">
                      <div className="w-8 h-8 bg-primary-black rounded-full flex items-center justify-center border-2 border-accent-gold/50 group-hover:border-accent-gold transition-colors duration-300">
                        <span className="text-accent-gold font-black text-sm">
                          {idx + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ProductCard
                    product={product}
                    badge={badge}
                    badgeColor={badgeColor}
                  />
                </div>
              );
            })}
          </div>

          {/* Barra de progreso del scroll */}
          {products.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-zinc/20 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-accent-gold to-accent-purple rounded-full"
                style={{ width: "0%" }}
              />
            </div>
          )}
        </div>

        {/* Dots de paginación */}
        {products.length > 1 && (
          <div className="flex justify-center space-x-2 mt-6">
            {products.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const container = cardsContainerRef.current;
                  const cardWidth = container?.children[0]?.clientWidth || 280;
                  container?.scrollTo({
                    left: idx * (cardWidth + 24),
                    behavior: "smooth",
                  });
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === 0
                    ? "w-6 bg-accent-gold"
                    : "bg-neutral-zinc/30 hover:bg-neutral-zinc"
                }`}
                aria-label={`Ir a conjunto ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Botón para personalizar desde cero */}
        <div className="flex justify-center mt-12">
          <Link
            href="/Design"
            className="group relative inline-flex items-center space-x-3 px-8 py-3 bg-accent-gold text-primary-black font-bold rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <FaPalette className="w-4 h-4" />
            <span className="relative z-10 text-sm uppercase tracking-wider">
              Crear desde cero
            </span>
            <FaArrowRight className="relative z-10 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
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
      `}</style>
    </section>
  );
}
