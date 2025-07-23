"use client";
import { useCart } from "../../context/CartContext";
import Image from "next/image";

export default function OrderSummary() {
  const { lines } = useCart();

  // Sumar precios simulando que tienes price en cada línea
  // En la práctica, consulta la info de variantes para el precio real
  const subtotal = lines.reduce((acc, item) => acc + (item.price || 30), 0); // 30 es precio dummy

  // Simulación de envío gratis si compras más de $70
  const freeShipping = subtotal >= 70;
  const shipping = freeShipping ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <aside className="bg-black text-white rounded-xl p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-5">Resumen del pedido</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)} USD</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Entrega/Envío</span>
        <span>{freeShipping ? "Gratis" : `$${shipping}`}</span>
      </div>
      <div className="mb-2">
        {freeShipping ? (
          <span className="text-green-400">
            ¡Calificas para envío gratuito!
          </span>
        ) : (
          <span className="text-gray-400">
            Faltan ${(70 - subtotal).toFixed(2)} USD para envío gratis
          </span>
        )}
        <div className="h-2 bg-zinc-800 rounded mt-1 overflow-hidden">
          <div
            className="h-2 bg-green-500 rounded"
            style={{ width: `${Math.min(100, (subtotal / 70) * 100)}%` }}
          />
        </div>
      </div>
      <div className="flex justify-between text-xl font-bold border-t border-gray-700 pt-3 mt-3">
        <span>Total</span>
        <span>${total.toFixed(2)} USD</span>
      </div>

      {/* Lista de productos */}
      <ul className="mt-8 space-y-4">
        {lines.map((item, idx) => (
          <li
            key={item.variantId + "-" + idx}
            className="flex items-center gap-4"
          >
            <div className="w-16 h-16 bg-gray-800 rounded relative overflow-hidden">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="block w-full h-full flex items-center justify-center text-xs">
                  IMG
                </span>
              )}
            </div>
            <div>
              <div className="font-bold">{item.title || "Producto"}</div>
              <div className="text-gray-300 text-sm">
                {item.size && <>Talla: {item.size} </>}
                {item.color && <>| {item.color}</>}
              </div>
              <div className="text-gray-400 text-xs">
                Cantidad: {item.quantity}
              </div>
              <div className="font-bold">${item.price || 30} USD</div>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
