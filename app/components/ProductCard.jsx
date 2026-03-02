"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FaShoppingBag } from "react-icons/fa";
import gsap from "gsap";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const quickAddRef = useRef(null);

  const img = product.images?.edges?.[0]?.node;
  const secondImg = product.images?.edges?.[1]?.node;

  const isCustom = product.options?.some(
    (opt) =>
      opt.name.toLowerCase() === "personalizable" &&
      opt.values.some((val) => val.toLowerCase() === "custom")
  );

  // Ruta según el tipo de producto
  const href = isCustom
    ? `/Design/${product.handle}`
    : `/product/${product.handle}`;

  // Animación de entrada de la tarjeta
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  // Manejar hover effects
  const handleMouseEnter = () => {
    setIsHovered(true);

    gsap.to(cardRef.current, {
      y: -8,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
      boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
    });

    gsap.to(contentRef.current, {
      y: -4,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(quickAddRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "back.out(1.2)",
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    });

    gsap.to(contentRef.current, {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(quickAddRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      ease: "power2.in",
    });
  };

  // Manejar quick add
  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    gsap.to(quickAddRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });

    console.log("Quick add:", product.title);
  };

  // Fallback para imágenes rotas
  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <Link href={href} className="block cursor-pointer group">
      <div
        ref={cardRef}
        className="relative bg-neutral-black rounded-2xl overflow-hidden shadow-xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Contenedor de imagen - TODAS IGUALES */}
        <div className="relative aspect-square overflow-hidden bg-primary-black">
          {/* Badge de personalizable */}
          {isCustom && (
            <div className="absolute top-3 left-3 z-20">
              <span className="bg-accent-gold text-primary-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                PERSONALIZA
              </span>
            </div>
          )}

          {/* Badge de nuevo (si aplica) */}
          {product.isNew && (
            <div className="absolute top-3 right-3 z-20">
              <span className="bg-accent-green text-primary-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                NUEVO
              </span>
            </div>
          )}

          {/* Imagen principal */}
          {img && !imgError ? (
            <Image
              ref={imageRef}
              src={img.url}
              alt={img.altText || product.title}
              fill
              className={`object-cover transition-transform duration-700 ${
                isHovered && secondImg ? "opacity-0" : "opacity-100"
              }`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onError={handleImageError}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-zinc/20">
              <span className="text-neutral-gray">Sin imagen</span>
            </div>
          )}

          {/* Segunda imagen para hover */}
          {secondImg && !imgError && (
            <Image
              src={secondImg.url}
              alt={img.altText || product.title}
              fill
              className={`object-cover transition-opacity duration-700 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}

          {/* Overlay sutil en hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-primary-black via-transparent to-transparent transition-opacity duration-300 ${
              isHovered ? "opacity-60" : "opacity-0"
            }`}
          />
        </div>

        {/* Información del producto - TODAS IGUALES */}
        <div ref={contentRef} className="p-4 bg-neutral-black">
          <h3 className="text-white font-semibold text-base md:text-lg line-clamp-1 mb-2">
            {product.title}
          </h3>

          {/* Precio siempre igual */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-2">
              <span className="text-accent-gold font-bold text-lg">
                ${product.priceRange?.minVariantPrice?.amount}
              </span>
              <span className="text-neutral-gray text-xs uppercase">
                {product.priceRange?.minVariantPrice?.currencyCode}
              </span>
            </div>

            {/* Indicador de colores/variantes - siempre igual */}
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 rounded-full bg-accent-blue border-2 border-white/20" />
              <div className="w-4 h-4 rounded-full bg-accent-gold border-2 border-white/20" />
              <div className="w-4 h-4 rounded-full bg-accent-purple border-2 border-white/20" />
              <span className="text-neutral-gray text-xs ml-1">+3</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
