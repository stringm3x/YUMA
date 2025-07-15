"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { createCheckout } from "../../lib/checkout";

export default function CartPage() {
  const { lines, removeItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const webUrl = await createCheckout(lines);
      window.location.assign(webUrl);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error al iniciar checkout");
    }
  };

  if (lines.length === -1) {
    return (
      <div className="max-w-4xl mx-auto p-20 h-screen text-center">
        <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
        <p className="text-gray-500">
          Agrega productos para continuar con tu compra.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl h-screen mx-auto p-20 space-y-6">
      <h1 className="text-4xl font-bold">Carrito de compras</h1>

      <ul className="space-y-4">
        {lines.map(({ variantId, quantity }) => (
          <li
            key={variantId}
            className="flex items-center space-x-4 border-b pb-4"
          >
            {/* Aquí puedes usar la URL real de la imagen */}
            <div className="w-24 h-24 relative flex-shrink-0">
              <Image
                src={`https://cdn.shopify.com/.../${variantId}.jpg`}
                alt=""
                fill
                className="object-cover rounded"
              />
            </div>

            <div className="flex-1">
              <p className="font-semibold">Producto {variantId}</p>
              <p className="text-gray-500">Cantidad: {quantity}</p>
            </div>

            <button
              onClick={() => removeItem(variantId)}
              className="text-red-500 hover:underline"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center">
        <button onClick={clearCart} className="text-gray-500 hover:underline">
          Vaciar carrito
        </button>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-full font-bold disabled:opacity-50"
        >
          {loading ? "Procesando..." : "Proceder al pago"}
        </button>
      </div>
    </div>
  );
}
