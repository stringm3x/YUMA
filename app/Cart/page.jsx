"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { createCheckout } from "../../lib/checkout";
import {
  FaShoppingCart,
  FaTrash,
  FaArrowLeft,
  FaLock,
  FaTag,
  FaShieldAlt,
  FaTruck,
  FaCreditCard,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import gsap from "gsap";

export default function CartPage() {
  const { lines, removeItem, clearCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const router = useRouter();

  const cartRef = useRef(null);
  const itemsRef = useRef([]);

  // Calcular totales
  const subtotal = lines.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );
  const envio = subtotal > 999 ? 0 : 99;
  const descuento = promoApplied ? subtotal * 0.1 : 0; // 10% de descuento ejemplo
  const total = subtotal + envio - descuento;

  // Animación de entrada
  useEffect(() => {
    gsap.fromTo(
      cartRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    gsap.fromTo(
      itemsRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  }, []);

  // Animación al eliminar item
  const handleRemoveItem = (variantId, index) => {
    gsap.to(itemsRef.current[index], {
      x: -100,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => removeItem(variantId),
    });
  };

  // Manejar código promocional
  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "YUMA10") {
      setPromoApplied(true);
      setPromoError("");
      gsap.to(".promo-success", {
        scale: 1.1,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      });
    } else {
      setPromoError("Código inválido");
      setPromoApplied(false);
    }
  };

  // Si NO está logueado
  if (!user) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-primary-black to-neutral-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-black/50 rounded-3xl p-12 border border-neutral-zinc/20 text-center">
            <div className="w-24 h-24 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingCart className="text-accent-gold text-4xl" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
              Inicia sesión para ver tu carrito
            </h1>
            <p className="text-neutral-gray text-lg mb-8 max-w-md mx-auto">
              Necesitas estar logueado para ver los productos que has agregado
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/Login")}
                className="px-8 py-3 bg-accent-gold text-primary-black font-bold rounded-full hover:bg-accent-gold/90 transition-all duration-300 transform hover:scale-105"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-8 py-3 border-2 border-white/20 text-white font-bold rounded-full hover:border-accent-gold hover:text-accent-gold transition-all duration-300"
              >
                Seguir comprando
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-primary-black to-neutral-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-black/50 rounded-3xl p-12 border border-neutral-zinc/20 text-center">
            <div className="w-24 h-24 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MdOutlineShoppingBag className="text-accent-gold text-4xl" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
              Tu carrito está vacío
            </h1>
            <p className="text-neutral-gray text-lg mb-8">
              Agrega productos para continuar con tu compra
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-accent-gold text-primary-black font-bold rounded-full hover:bg-accent-gold/90 transition-all duration-300 transform hover:scale-105"
            >
              <FaArrowLeft />
              <span>Ir a la tienda</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const checkoutUrl = await createCheckout(lines);
      window.location.assign(checkoutUrl);
    } catch (err) {
      console.error("Error real:", err);
      setLoading(false);
      alert("Error al iniciar checkout: " + err.message);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-primary-black to-neutral-black py-10">
      <div ref={cartRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con navegación */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-neutral-gray hover:text-accent-gold transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span>Seguir comprando</span>
          </button>
          <h1 className="text-2xl font-bold text-white">
            Carrito ({lines.length}{" "}
            {lines.length === 1 ? "producto" : "productos"})
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Lista de productos */}
          <div className="flex-1">
            <div className="bg-neutral-black/50 rounded-3xl p-6 border border-neutral-zinc/20">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <FaShoppingCart className="text-accent-gold mr-2" />
                Productos en tu carrito
              </h2>

              <ul className="space-y-4">
                {lines.map((item, index) => {
                  const {
                    variantId,
                    quantity,
                    title,
                    image,
                    price,
                    productTitle,
                  } = item;
                  const [size, color] = (title || "").split(" / ");

                  return (
                    <li
                      key={`${variantId}-${title}`}
                      ref={(el) => (itemsRef.current[index] = el)}
                      className="group relative bg-primary-black/50 rounded-2xl p-4 border border-neutral-zinc/20 hover:border-accent-gold/30 transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        {/* Imagen del producto */}
                        <div className="relative w-24 h-24 flex-shrink-0 bg-neutral-800 rounded-xl overflow-hidden">
                          <Image
                            src={image || "/placeholder.jpg"}
                            alt={productTitle || "Producto"}
                            fill
                            className="object-cover"
                          />

                          {/* Badge de cantidad */}
                          <div className="absolute top-2 left-2 bg-accent-gold text-primary-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                            {quantity}
                          </div>
                        </div>

                        {/* Detalles del producto */}
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-white font-bold text-lg mb-1">
                                {productTitle || "Producto"}
                              </h3>
                              <div className="flex flex-wrap gap-3 text-sm">
                                {size && (
                                  <span className="text-neutral-gray">
                                    Talla:{" "}
                                    <span className="text-white font-bold">
                                      {size}
                                    </span>
                                  </span>
                                )}
                                {color && (
                                  <span className="text-neutral-gray">
                                    Color:{" "}
                                    <span className="text-white font-bold">
                                      {color}
                                    </span>
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Precio */}
                            <div className="text-right">
                              <span className="text-accent-gold font-black text-xl">
                                ${price}
                              </span>
                              <span className="text-neutral-gray text-xs block">
                                MXN
                              </span>
                            </div>
                          </div>

                          {/* Controles de cantidad y eliminar */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  updateQuantity(variantId, quantity - 1)
                                }
                                disabled={quantity <= 1}
                                className="w-8 h-8 rounded-full border border-neutral-zinc/30 text-white hover:border-accent-gold hover:text-accent-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                              >
                                <FaMinus className="mx-auto text-sm" />
                              </button>
                              <span className="text-white font-bold w-8 text-center">
                                {quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(variantId, quantity + 1)
                                }
                                className="w-8 h-8 rounded-full border border-neutral-zinc/30 text-white hover:border-accent-gold hover:text-accent-gold transition-colors"
                              >
                                <FaPlus className="mx-auto text-sm" />
                              </button>
                            </div>

                            <button
                              onClick={() => handleRemoveItem(variantId, index)}
                              className="text-neutral-gray hover:text-accent-red transition-colors flex items-center space-x-1"
                            >
                              <FaTrash className="text-sm" />
                              <span className="text-sm">Eliminar</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Línea decorativa inferior (excepto último) */}
                      {index < lines.length - 1 && (
                        <div className="absolute -bottom-2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-neutral-zinc/20 to-transparent" />
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Botón vaciar carrito */}
              <div className="mt-6 pt-4 border-t border-neutral-zinc/20">
                <button
                  onClick={clearCart}
                  className="text-neutral-gray hover:text-accent-red transition-colors flex items-center space-x-2"
                >
                  <FaTrash className="text-sm" />
                  <span className="text-sm">Vaciar carrito</span>
                </button>
              </div>
            </div>
          </div>

          {/* Resumen de compra */}
          <div className="lg:w-96">
            <div className="bg-neutral-black/50 rounded-3xl p-6 border border-neutral-zinc/20 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <FaTag className="text-accent-gold mr-2" />
                Resumen de compra
              </h2>

              {/* Código promocional */}
              <div className="mb-6">
                <label className="block text-neutral-gray text-sm mb-2">
                  ¿Tienes un cupón?
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="YUMA10"
                    className="flex-1 px-4 py-2 bg-primary-black border border-neutral-zinc/30 rounded-xl text-white placeholder-neutral-gray/50 focus:outline-none focus:border-accent-gold transition-colors"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-accent-gold text-primary-black font-bold rounded-xl hover:bg-accent-gold/90 transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
                {promoError && (
                  <p className="text-accent-red text-xs mt-2">{promoError}</p>
                )}
                {promoApplied && (
                  <p className="promo-success text-accent-green text-xs mt-2 flex items-center">
                    <FaCheckCircle className="mr-1" />
                    Código aplicado: 10% de descuento
                  </p>
                )}
              </div>

              {/* Detalles de precios */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-neutral-gray">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">
                    ${subtotal.toFixed(2)} MXN
                  </span>
                </div>

                <div className="flex justify-between text-neutral-gray">
                  <span>Envío</span>
                  {envio === 0 ? (
                    <span className="text-accent-green font-bold">GRATIS</span>
                  ) : (
                    <span className="text-white font-bold">
                      ${envio.toFixed(2)} MXN
                    </span>
                  )}
                </div>

                {descuento > 0 && (
                  <div className="flex justify-between text-neutral-gray">
                    <span>Descuento (10%)</span>
                    <span className="text-accent-green font-bold">
                      -${descuento.toFixed(2)} MXN
                    </span>
                  </div>
                )}

                <div className="border-t border-neutral-zinc/20 my-3 pt-3">
                  <div className="flex justify-between">
                    <span className="text-white font-bold text-lg">Total</span>
                    <span className="text-accent-gold font-black text-2xl">
                      ${total.toFixed(2)} MXN
                    </span>
                  </div>
                </div>
              </div>

              {/* Beneficios */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-primary-black/50 rounded-xl p-3 text-center">
                  <FaTruck className="text-accent-gold mx-auto mb-1" />
                  <p className="text-white text-xs font-bold">Envío gratis</p>
                  <p className="text-neutral-gray text-xs">+$999</p>
                </div>
                <div className="bg-primary-black/50 rounded-xl p-3 text-center">
                  <FaShieldAlt className="text-accent-gold mx-auto mb-1" />
                  <p className="text-white text-xs font-bold">Pago seguro</p>
                  <p className="text-neutral-gray text-xs">SSL</p>
                </div>
              </div>

              {/* Botón de pago */}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-accent-gold text-primary-black font-bold rounded-xl py-4 hover:bg-accent-gold/90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <FaLock />
                    <span>Proceder al pago</span>
                  </>
                )}
              </button>

              {/* Aceptamos */}
              <div className="mt-4 text-center">
                <p className="text-neutral-gray text-xs mb-2">Aceptamos</p>
                <div className="flex justify-center space-x-3">
                  <FaCreditCard className="text-neutral-gray text-xl" />
                  <FaCreditCard className="text-neutral-gray text-xl" />
                  <FaCreditCard className="text-neutral-gray text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
