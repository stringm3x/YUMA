"use client";

import { useCart } from "../../../context/CartContext";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import Modal from "../components/Modal";
import Image from "next/image";

export default function ProductDetails({ product }) {
  const { title, images, variants } = product;
  const [qty, setQty] = useState(1);
  const [showDetails, setShowDetails] = useState(false);

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

  const handleAddToCart = () => {
    addItem({
      variantId: selectedVariant.id,
      quantity: qty,
      title: `${selectedSize} / ${color}`,
      image: images[0]?.node.url || "",
      price: selectedVariant.price,
      productTitle: title,
    });
    router.push("/Cart");
  };

  return (
    <section className="flex flex-col-reverse lg:flex-row py-20 px-6 sm:px-14 xl:p-20 xl:h-screen overflow-hidden">
      {/* --- Detalles izquierdo --- */}
      <div className="lg:w-1/2 flex flex-col gap-5">
        <h1 className="text-5xl sm:text-7xl xl:text-8xl font-bold">{title}</h1>

        {/* PRECIO */}
        <div className="flex flex-col gap-1 pl-2">
          <h2 className="text-xl sm:text-2xl xl:text-3xl text-zinc">Precio</h2>
          <span className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white">
            ${selectedVariant.price} {selectedVariant.currency}
          </span>
        </div>

        {/* Selector de color */}
        <div className="flex flex-col gap-3 pl-2">
          <h2 className="text-xl sm:text-2xl xl:text-3xl text-zinc">
            Selecciona el color
          </h2>
          <div className="flex items-center space-x-5">
            {colores.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`
                  w-8 h-8 rounded-full border transition
                  ${color === c ? "ring-2 ring-white" : "ring-0"}
                `}
                style={{
                  backgroundColor:
                    c.toLowerCase() === "negro"
                      ? "#111"
                      : c.toLowerCase() === "azul"
                      ? "#38bdf8"
                      : c.toLowerCase() === "amarillo"
                      ? "#facc15"
                      : c.toLowerCase() === "clara"
                      ? "#f3f4f6"
                      : c.toLowerCase() === "beige"
                      ? "#f5f5dc"
                      : c.toLowerCase() === "bronce"
                      ? "#b08d57"
                      : "#eee",
                }}
                aria-label={c}
                title={c}
              />
            ))}
          </div>
        </div>

        {/* Selector de talla */}
        <div>
          <h2 className="text-xl sm:text-2xl xl:text-3xl text-zinc mb-2">
            Talla
          </h2>
          <div className="flex space-x-2">
            {tallas.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 rounded ${
                  selectedSize === size
                    ? "bg-white text-black"
                    : "bg-gray text-black hover:bg-zinc"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Cantidad + Botón */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <div className="flex items-center space-x-2 border border-white rounded">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-3 text-xl"
            >
              −
            </button>
            <span className="px-4">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="px-3 text-xl"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-white text-black w-60 xl:w-64 h-12 rounded-full font-bold text-lg"
          >
            AGREGAR AL CARRITO
          </button>
        </div>

        {/* Más detalles (toggle) */}
        <div className="mt-10">
          <button
            onClick={() => setShowDetails(true)}
            className="flex items-center text-gray space-x-2 hover:text-white hover:underline"
          >
            <span> Más detalles</span>
          </button>
        </div>

        <Modal isOpen={showDetails} onClose={() => setShowDetails(false)}>
          <h2 className="text-3xl sm:text-5xl font-bold mb-10">DESCRIPCIÓN</h2>
          <ul className="list-disc sm:ml-6 space-y-2 text-gray">
            <li>Diseño minimalista para un enfoque total</li>
            <li>Logo termosellado</li>
            <li>Estilo de brazo caído para mayor libertad...</li>
          </ul>

          <h3 className="text-2xl font-bold mt-6 mb-2">TALLAS Y CORTE</h3>
          <ul className="list-disc sm:ml-6 space-y-2 text-gray">
            <li>Slim fit</li>
            <li>Largo regular</li>
            <li>Modelo mide 1,75 m (5'9\") y lleva la talla L.</li>
          </ul>

          <h3 className="text-2xl font-bold mt-6 mb-2">
            MATERIALES Y CUIDADOS
          </h3>
          <ul className="list-disc sm:ml-6 space-y-2 text-gray">
            <li>57% algodón, 38% poliéster reciclado, 5% elastano.</li>
          </ul>

          <p className="mt-6 text-gray">SKU: A1A2R-KCPS</p>
        </Modal>
      </div>

      {/* Imagen del producto */}
      <div className="lg:w-1/2 flex items-center justify-center">
        {images ? (
          <div className="relative w-96 h-[600px]">
            <Image
              src={images[0]?.node.url}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="w-96 h-[600px] bg-gray-200 flex items-center justify-center">
            <span className="text-gray">Imagen no disponible</span>
          </div>
        )}
      </div>
    </section>
  );
}
