"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { createCheckout } from "../../lib/checkout";

export default function CartPage() {
  const { lines, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Si NO está logueado
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-20 h-screen flex flex-col items-center justify-center gap-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-6">
          Inicia sesión para ver tu carrito
        </h1>
        <button
          className="bg-white text-black px-6 py-3 rounded-full font-bold text-xl"
          onClick={() => router.push("/Login")}
        >
          Ir a iniciar sesión
        </button>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-20 h-screen text-center">
        <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
        <p className="text-gray">
          Agrega productos para continuar con tu compra.
        </p>
      </div>
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
    <div className="max-w-4xl h-screen mx-auto p-20 space-y-6">
      <h1 className="text-4xl font-bold">Carrito de compras</h1>

      <ul className="space-y-4">
        {lines.map(
          ({ variantId, quantity, title, image, price, productTitle }) => {
            const [size, color] = (title || "").split(" / ");
            return (
              <li
                key={`${variantId}-${title}-${quantity}`}
                className="flex items-center space-x-4 border-b pb-4"
              >
                <div className="w-24 h-24 relative flex-shrink-0 bg-gray  rounded">
                  <Image
                    src={image || "/placeholder.jpg"}
                    alt={title || "Producto"}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{productTitle || "Producto"}</p>
                  <div className="text-gray text-sm">
                    {size && <span>Talla: {size}</span>}
                    {color && <span className="ml-3">Color: {color}</span>}
                  </div>
                  <p className="text-gray">Cantidad: {quantity}</p>
                  {price && <p className="text-gray">Precio: ${price}</p>}
                </div>
                <button
                  onClick={() => removeItem(variantId)}
                  className="text-red hover:underline"
                >
                  Eliminar
                </button>
              </li>
            );
          }
        )}
      </ul>

      <div className="flex justify-between items-center">
        <button onClick={clearCart} className="text-gray hover:underline">
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
