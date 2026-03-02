"use client";

import ProductCard from "../components/ProductCard";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAllProducts } from "../../lib/shopify";

gsap.registerPlugin(ScrollTrigger);

export default function BestSelling() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  // Cargar productos
  useEffect(() => {
    async function loadProducts() {
      try {
        const allProducts = await getAllProducts(8);
        const count = 5;

        const displayProducts =
          allProducts && allProducts.length >= count
            ? allProducts.slice(0, count)
            : Array.from({ length: count }, (_, i) => allProducts?.[0] || null);

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
    if (loading || products.length === 0) return;

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
    ).fromTo(
      cardsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.3"
    );
  }, [loading, products]);

  // Skeletons mientras carga
  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-primary-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              LO MÁS VENDIDO
            </h2>
            <div className="w-20 h-1 bg-accent-gold mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <div key={idx} className="animate-pulse">
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

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-primary-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            LO MÁS VENDIDO
          </h2>
          <div className="w-20 h-1 bg-accent-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((product, idx) => (
            <div
              key={product?.id || idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="transform transition-transform duration-300 hover:-translate-y-2"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Línea decorativa */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent mt-16" />
      </div>
    </section>
  );
}
