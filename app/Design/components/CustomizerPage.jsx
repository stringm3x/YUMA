"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "../../../context/CartContext";

export default function CustomizerPage({ product }) {
  // States para el formulario
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [secondaryLogos, setSecondaryLogos] = useState([]);
  const [referenceDesigns, setReferenceDesigns] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { addItem } = useCart();

  // --- Manejo de subida a Cloudinary (simulado) ---
  async function handleUpload(e, setter, multiple = false) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setLoading(true);

    const uploaders = Array.from(files).map(async (file) => {
      // Puedes usar https://cloudinary.com/documentation/upload_images#example_1_upload_an_image
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "tu_preset_publico");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();
      return data.secure_url;
    });

    const urls = await Promise.all(uploaders);
    setLoading(false);
    if (multiple) {
      setter((prev) => [...prev, ...urls]);
    } else {
      setter(urls[0]);
    }
  }

  // --- Agregar al carrito ---
  const handleAddToCart = () => {
    addItem({
      variantId: "personalizado",
      quantity: 1,
      title: product.title,
      customization: {
        primaryColor,
        secondaryColor,
        logoUrl,
        secondaryLogos,
        referenceDesigns,
        description,
      },
      price: Number(product.priceRange?.minVariantPrice?.amount) || 0,
      productTitle: product.title,
      image: product.images[0]?.node.url,
    });
    alert("¡Agregado al carrito!");
  };

  return (
    <section className="flex flex-col lg:flex-row p-20 gap-3">
      {/* Prendas a la izquierda */}
      <div className="flex flex-col gap-10 w-1/6">
        {product.images?.slice(1, 3).map((img, idx) => (
          <div key={img.node.url} className="flex flex-col items-center">
            <div className="w-48 h-48 relative">
              <Image
                src={img.node.url}
                alt={img.node.altText || `Prenda #${idx + 1}`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}

        {/* Total */}
        <div className="mt-8 flex flex-col items-center">
          <h1 className="text-3xl text-white font-bold">Total</h1>
          <p className="text-4xl text-white font-bold">
            ${product.variants[0].price}
          </p>
        </div>
      </div>

      {/* Personalización a la derecha */}
      <div className="flex-1 max-w-xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Personaliza tu conjunto
        </h1>

        {/* Colores */}
        <div>
          <label className="block text-white mb-2">Elige color principal</label>
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-10 h-10 mr-3"
          />
          <label className="block text-white mt-4 mb-2">
            Elige color secundario (opcional)
          </label>
          <input
            type="color"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
            className="w-10 h-10"
          />
        </div>

        {/* Logo principal */}
        <div>
          <label className="block text-white mb-2">
            Subir Logotipo principal
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUpload(e, setLogoUrl, false)}
            className="mb-2"
          />
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Logo"
              className="w-20 h-20 object-contain"
            />
          )}
        </div>

        {/* Logos secundarios */}
        <div>
          <label className="block text-white mb-2">
            Subir Logotipos secundarios (máx 3)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleUpload(e, setSecondaryLogos, true)}
            className="mb-2"
          />
          <div className="flex gap-2">
            {secondaryLogos.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Logo secundario ${i}`}
                className="w-14 h-14 object-contain"
              />
            ))}
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-white mb-2">Descripción</label>
          <textarea
            className="w-full h-20 p-2 rounded"
            placeholder="Introduce especificaciones o peticiones generales"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Diseños de referencia */}
        <div>
          <label className="block text-white mb-2">
            Subir diseños de referencia
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleUpload(e, setReferenceDesigns, true)}
            className="mb-2"
          />
          <div className="flex gap-2">
            {referenceDesigns.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Referencia ${i}`}
                className="w-14 h-14 object-contain"
              />
            ))}
          </div>
        </div>

        {/* Agregar al carrito */}
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="mt-6 bg-white text-black py-3 px-8 rounded-full font-bold"
        >
          {loading ? "Subiendo archivos..." : "Agregar al carrito"}
        </button>

        <p className="text-gray-400 text-xs mt-3">
          Para verificar, al momento de pagar nos contactaremos con el diseño
          que usted pidió.
        </p>
      </div>
    </section>
  );
}
