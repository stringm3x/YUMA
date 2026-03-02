"use client";

import { useCart } from "../../../context/CartContext";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect, useRef } from "react";
import Modal from "../components/Modal";
import Image from "next/image";
import {
  FaCheck,
  FaArrowLeft,
  FaHeart,
  FaRegHeart,
  FaShoppingBag,
  FaRuler,
  FaPalette,
  FaInfoCircle,
} from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import gsap from "gsap";

export default function ProductDetails({ product }) {
  const { title, images, variants, description } = product;
  const [qty, setQty] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Refs para animaciones
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const detailsRef = useRef(null);

  // Extrae tallas y colores únicos
  const tallas = useMemo(
    () => [...new Set(variants.map((v) => v.title.split(" / ")[0]))],
    [variants]
  );
  const colores = useMemo(
    () => [...new Set(variants.map((v) => v.title.split(" / ")[1]))],
    [variants]
  );

  const [selectedSize, setSelectedSize] = useState(tallas[0] || "");
  const [color, setColor] = useState(colores[0] || "");

  // Encuentra la variante correcta según talla y color
  const selectedVariant =
    variants.find((v) => v.title === `${selectedSize} / ${color}`) ||
    variants[0];

  const { addItem } = useCart();
  const router = useRouter();

  // Animación de entrada
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      imageRef.current,
      { x: 100, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
    ).fromTo(
      detailsRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );
  }, []);

  // Animación al cambiar de imagen
  const handleImageChange = (index) => {
    setSelectedImage(index);
    gsap.fromTo(
      imageRef.current,
      { scale: 0.9, opacity: 0.5 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  };

  const handleAddToCart = () => {
    // Validaciones
    if (!selectedSize) {
      alert("Por favor selecciona una talla");
      return;
    }
    if (!color) {
      alert("Por favor selecciona un color");
      return;
    }

    addItem({
      variantId: selectedVariant.id,
      quantity: qty,
      title: `${selectedSize} / ${color}`,
      image: images[0]?.node.url || "",
      price: selectedVariant.price,
      productTitle: title,
    });

    // Animación de éxito
    gsap.to(".cart-button", {
      scale: 1.1,
      backgroundColor: "#50ff05",
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        router.push("/Cart");
      },
    });
  };

  // Mapeo de colores
  const getColorStyle = (c) => {
    const colorMap = {
      negro: "#111111",
      azul: "#004aad",
      amarillo: "#f6c75e",
      clara: "#f3f4f6",
      beige: "#f5f5dc",
      bronce: "#b08d57",
      rojo: "#c30000",
      morado: "#7e5bef",
      verde: "#50ff05",
      naranja: "#f97316",
    };
    return colorMap[c.toLowerCase()] || "#f6c75e";
  };

  return (
    <section ref={sectionRef} className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navegación superior */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-neutral-gray hover:text-accent-gold transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span>Volver</span>
          </button>

          <button
            onClick={() => setIsLiked(!isLiked)}
            className="text-neutral-gray hover:text-accent-gold transition-colors"
          >
            {isLiked ? (
              <FaHeart className="text-accent-gold text-2xl" />
            ) : (
              <FaRegHeart className="text-2xl" />
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Galería de imágenes */}
          <div ref={imageRef} className="lg:w-1/2">
            <div className="sticky top-24">
              {/* Imagen principal */}
              <div className="relative aspect-square bg-neutral-black rounded-3xl overflow-hidden border border-neutral-zinc/20 mb-4">
                {images ? (
                  <Image
                    src={images[selectedImage]?.node.url}
                    alt={title}
                    fill
                    className="object-contain p-8"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                    <span className="text-neutral-gray">
                      Imagen no disponible
                    </span>
                  </div>
                )}
              </div>

              {/* Miniaturas */}
              {images && images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleImageChange(idx)}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === idx
                          ? "border-accent-gold scale-105"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img.node.url}
                        alt={`Vista ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Detalles del producto */}
          <div ref={detailsRef} className="lg:w-1/2 space-y-8">
            {/* Título y badge */}
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-accent-gold text-sm font-bold tracking-[0.2em] uppercase">
                  NUEVA COLECCIÓN
                </span>
                <div className="w-8 h-[2px] bg-accent-gold" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
                {title}
              </h1>
            </div>

            {/* Precio */}
            <div className="bg-neutral-black/50 rounded-2xl p-6 border border-neutral-zinc/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-gray text-sm mb-1">Precio</p>
                  <span className="text-4xl md:text-5xl font-black text-accent-gold">
                    ${selectedVariant.price}
                  </span>
                  <span className="text-neutral-gray text-sm ml-2">
                    {selectedVariant.currency}
                  </span>
                </div>

                {/* Stock */}
                {selectedVariant.availableForSale ? (
                  <div className="flex items-center space-x-2 bg-accent-green/10 text-accent-green px-3 py-1 rounded-full">
                    <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
                    <span className="text-sm font-bold">En stock</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 bg-accent-red/10 text-accent-red px-3 py-1 rounded-full">
                    <span className="w-2 h-2 bg-accent-red rounded-full" />
                    <span className="text-sm font-bold">Agotado</span>
                  </div>
                )}
              </div>
            </div>

            {/* Selector de color */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-bold flex items-center">
                  <FaPalette className="text-accent-gold mr-2" />
                  Color: <span className="text-accent-gold ml-2">{color}</span>
                </h2>
                <span className="text-neutral-gray text-sm">
                  {colores.length} opciones
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {colores.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className="group relative"
                  >
                    <div
                      className={`w-12 h-12 rounded-full transition-all duration-300 ${
                        color === c
                          ? "ring-2 ring-accent-gold ring-offset-2 ring-offset-primary-black scale-110"
                          : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: getColorStyle(c) }}
                    />
                    {color === c && (
                      <FaCheck className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm drop-shadow-md" />
                    )}

                    {/* Tooltip */}
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-primary-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-neutral-zinc/20">
                      {c}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de talla */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-bold flex items-center">
                  <FaRuler className="text-accent-gold mr-2" />
                  Talla:{" "}
                  <span className="text-accent-gold ml-2">{selectedSize}</span>
                </h2>
                <button
                  onClick={() => setShowDetails(true)}
                  className="text-neutral-gray text-sm hover:text-accent-gold transition-colors underline"
                >
                  Guía de tallas
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {tallas.map((size) => {
                  const variant = variants.find((v) =>
                    v.title.startsWith(size)
                  );
                  const isAvailable = variant?.availableForSale;

                  return (
                    <button
                      key={size}
                      onClick={() => isAvailable && setSelectedSize(size)}
                      disabled={!isAvailable}
                      className={`
                        relative min-w-[60px] px-4 py-3 rounded-xl font-bold transition-all duration-300
                        ${
                          selectedSize === size && isAvailable
                            ? "bg-accent-gold text-primary-black scale-105"
                            : isAvailable
                            ? "bg-neutral-black/50 text-white border border-neutral-zinc/30 hover:border-accent-gold/50"
                            : "bg-neutral-black/30 text-neutral-gray/30 cursor-not-allowed border border-neutral-zinc/20"
                        }
                      `}
                    >
                      {size}
                      {!isAvailable && (
                        <span className="absolute -top-2 -right-2 text-xs bg-accent-red text-white px-1 rounded">
                          Agotado
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cantidad y botón */}
            <div className="space-y-4 pt-4">
              <h2 className="text-white font-bold">Cantidad</h2>

              <div className="flex flex-col sm:flex-row items-stretch gap-4">
                <div className="flex items-center justify-between bg-neutral-black/50 border border-neutral-zinc/30 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-12 h-12 text-2xl text-white hover:bg-accent-gold hover:text-primary-black transition-colors"
                  >
                    −
                  </button>
                  <span className="w-16 text-center text-white font-bold text-xl">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-12 h-12 text-2xl text-white hover:bg-accent-gold hover:text-primary-black transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!selectedVariant.availableForSale}
                  className="cart-button flex-1 bg-accent-gold text-primary-black font-bold rounded-xl py-3 px-8 hover:bg-accent-gold/90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <FaShoppingBag />
                  <span>AGREGAR AL CARRITO</span>
                </button>
              </div>
            </div>

            {/* Descripción rápida */}
            <div className="pt-4 border-t border-neutral-zinc/20">
              <p className="text-neutral-gray text-sm leading-relaxed">
                {description ||
                  "Diseño minimalista para un enfoque total. Logo termosellado. Estilo de brazo caído para mayor libertad de movimiento."}
              </p>

              <button
                onClick={() => setShowDetails(true)}
                className="mt-4 text-accent-gold text-sm font-bold hover:underline flex items-center"
              >
                Ver detalles completos
                <FaInfoCircle className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de detalles */}
      <Modal isOpen={showDetails} onClose={() => setShowDetails(false)}>
        <div className="p-6 bg-primary-black border-1">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            DETALLES DEL PRODUCTO
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-accent-gold mb-3">
                DESCRIPCIÓN
              </h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-gray">
                <li>Diseño minimalista para un enfoque total</li>
                <li>Logo termosellado de alta durabilidad</li>
                <li>Estilo de brazo caído para mayor libertad de movimiento</li>
                <li>Costuras reforzadas para mayor resistencia</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-accent-gold mb-3">
                TALLAS Y CORTE
              </h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-gray">
                <li>Slim fit - corte ajustado</li>
                <li>Largo regular</li>
                <li>Modelo mide 1.75 m (5'9") y lleva la talla L</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-accent-gold mb-3">
                MATERIALES Y CUIDADOS
              </h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-gray">
                <li>57% algodón, 38% poliéster reciclado, 5% elastano</li>
                <li>Lavar en frío</li>
                <li>No usar blanqueador</li>
                <li>Secar en sombra</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-neutral-zinc/20">
              <p className="text-neutral-gray text-sm">
                <span className="font-bold text-white">SKU:</span>{" "}
                {selectedVariant.sku || "A1A2R-KCPS"}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}
