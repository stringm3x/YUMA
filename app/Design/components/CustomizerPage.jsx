"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../../context/CartContext";
import {
  FaPalette,
  FaCloudUploadAlt,
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaMagic,
  FaTshirt,
  FaHatCowboy,
  FaCut,
  FaTrash,
  FaPlus,
  FaInfoCircle,
} from "react-icons/fa";
import { MdDoubleArrow } from "react-icons/md";
import gsap from "gsap";

export default function CustomizerPage({ product }) {
  // Estados actuales del formulario
  const [primaryColor, setPrimaryColor] = useState("#f6c75e");
  const [secondaryColor, setSecondaryColor] = useState("#004aad");
  const [logoUrl, setLogoUrl] = useState("");
  const [secondaryLogos, setSecondaryLogos] = useState([]);
  const [referenceDesigns, setReferenceDesigns] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState("basicos");

  // Estados para nuevos campos
  const [dobleVista, setDobleVista] = useState(false);
  const [prenda, setPrenda] = useState("");
  const [gorro, setGorro] = useState(false);
  const [tipoManga, setTipoManga] = useState("");
  const [talla, setTalla] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [notas, setNotas] = useState("");

  const { addItem } = useCart();

  // Refs para animaciones
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const step4Ref = useRef(null);
  const previewRef = useRef(null);

  // Efecto para animar cambios de paso
  useEffect(() => {
    gsap.fromTo(
      previewRef.current,
      { scale: 0.95, opacity: 0.5 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
    );
  }, [primaryColor, secondaryColor, dobleVista, tipoManga]);

  // --- Manejo de subida a Cloudinary con progreso ---
  async function handleUpload(e, setter, multiple = false) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setLoading(true);
    setUploadProgress(0);

    const uploaders = Array.from(files).map(async (file, index) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "tu_preset_publico");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setUploadProgress(((index + 1) / files.length) * 100);
      return data.secure_url;
    });

    const urls = await Promise.all(uploaders);
    setLoading(false);
    setUploadProgress(0);

    if (multiple) {
      setter((prev) => [...prev, ...urls]);
    } else {
      setter(urls[0]);
    }
  }

  // Eliminar imagen
  const removeImage = (setter, index, currentList) => {
    const newList = currentList.filter((_, i) => i !== index);
    setter(newList);
  };

  // --- Agregar al carrito ---
  const handleAddToCart = () => {
    // Validaciones
    if (!primaryColor) {
      alert("Por favor selecciona un color principal");
      return;
    }
    if (!talla) {
      alert("Por favor selecciona una talla");
      return;
    }

    addItem({
      variantId: "personalizado",
      quantity: cantidad,
      title: product.title,
      customization: {
        primaryColor,
        secondaryColor,
        logoUrl,
        secondaryLogos,
        referenceDesigns,
        description,
        dobleVista,
        prenda,
        gorro,
        tipoManga,
        talla,
        notas,
      },
      price: Number(product.priceRange?.minVariantPrice?.amount) || 0,
      productTitle: product.title,
      image: product.images[0]?.node.url,
    });

    // Animación de éxito
    gsap.to(".cart-button", {
      scale: 1.1,
      backgroundColor: "#50ff05",
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        alert("✅ ¡Producto agregado al carrito!");
      },
    });
  };

  // Tallas disponibles
  const tallas = ["XS", "S", "M", "L", "XL", "XXL"];

  // Pasos del customizer
  const steps = [
    { number: 1, name: "Básicos", icon: FaTshirt },
    { number: 2, name: "Colores", icon: FaPalette },
    { number: 3, name: "Logos", icon: FaCloudUploadAlt },
    { number: 4, name: "Detalles", icon: FaMagic },
  ];

  return (
    <section className="min-h-screen py-20">
      {/* Header con navegación */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/Design"
          className="inline-flex items-center text-neutral-gray hover:text-accent-gold transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          <span>Volver a conjuntos</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            PERSONALIZA TU <span className="text-accent-gold">CONJUNTO</span>
          </h1>
          <div className="w-24 h-1 bg-accent-gold mx-auto rounded-full" />
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-12 max-w-3xl mx-auto">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex items-center flex-1">
              <button
                onClick={() => setCurrentStep(step.number)}
                className={`flex flex-col items-center group ${
                  currentStep >= step.number
                    ? "text-accent-gold"
                    : "text-neutral-gray"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    currentStep >= step.number
                      ? "border-accent-gold bg-accent-gold/10"
                      : "border-neutral-gray/30"
                  }`}
                >
                  <step.icon
                    className={`text-xl ${
                      currentStep >= step.number
                        ? "text-accent-gold"
                        : "text-neutral-gray"
                    }`}
                  />
                </div>
                <span className="text-xs mt-2 font-bold">{step.name}</span>
              </button>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-[2px] mx-4 transition-colors duration-300 ${
                    currentStep > step.number
                      ? "bg-accent-gold"
                      : "bg-neutral-gray/20"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Vista previa en tiempo real */}
          <div className="lg:w-1/3">
            <div
              ref={previewRef}
              className="sticky top-24 bg-neutral-black rounded-3xl p-6 border border-neutral-zinc/20"
            >
              <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                <FaMagic className="text-accent-gold mr-2" />
                Vista previa
              </h3>

              <div className="relative aspect-square bg-primary-black rounded-2xl overflow-hidden mb-4">
                {/* Imagen base */}
                <Image
                  src={product.images[0]?.node.url || "/placeholder.png"}
                  alt="Vista previa"
                  fill
                  className="object-contain"
                />

                {/* Overlay de color simulado */}
                {primaryColor && (
                  <div
                    className="absolute inset-0 mix-blend-multiply opacity-30"
                    style={{ backgroundColor: primaryColor }}
                  />
                )}

                {/* Logo subido */}
                {logoUrl && (
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full p-1">
                    <img
                      src={logoUrl}
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                {/* Indicadores visuales */}
                {dobleVista && (
                  <div className="absolute bottom-4 left-4 bg-accent-gold text-primary-black text-xs font-bold px-2 py-1 rounded-full">
                    Doble vista
                  </div>
                )}
                {gorro && (
                  <div className="absolute bottom-4 right-4 bg-accent-purple text-white text-xs font-bold px-2 py-1 rounded-full">
                    + Gorro
                  </div>
                )}
              </div>

              {/* Resumen de personalización */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-neutral-gray">
                  <span>Color principal:</span>
                  <div className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: primaryColor }}
                    />
                    <span className="text-white">{primaryColor}</span>
                  </div>
                </div>
                {secondaryColor && (
                  <div className="flex justify-between text-neutral-gray">
                    <span>Color secundario:</span>
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: secondaryColor }}
                      />
                      <span className="text-white">{secondaryColor}</span>
                    </div>
                  </div>
                )}
                <div className="flex justify-between text-neutral-gray">
                  <span>Cantidad:</span>
                  <span className="text-white font-bold">{cantidad}</span>
                </div>
                <div className="flex justify-between text-neutral-gray">
                  <span>Talla:</span>
                  <span className="text-white font-bold">
                    {talla || "No seleccionada"}
                  </span>
                </div>
              </div>

              {/* Precio total */}
              <div className="mt-6 pt-4 border-t border-neutral-zinc/20">
                <div className="flex justify-between items-center">
                  <span className="text-white text-lg">Total:</span>
                  <span className="text-accent-gold text-3xl font-black">
                    ${(Number(product.variants[0].price) * cantidad).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de personalización */}
          <div className="flex-1 lg:w-2/3">
            <div className="bg-neutral-black/50 rounded-3xl p-8 border border-neutral-zinc/20">
              {/* Paso 1: Básicos */}
              {currentStep === 1 && (
                <div ref={step1Ref} className="space-y-8">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <span className="w-8 h-8 bg-accent-gold text-primary-black rounded-full flex items-center justify-center mr-3">
                      1
                    </span>
                    Información básica
                  </h2>

                  {/* Selección de prenda */}
                  <div>
                    <label className="block text-white mb-3 font-bold">
                      ¿Qué deseas personalizar?
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {["Short", "Licra", "Playera", "Conjunto completo"].map(
                        (opcion) => (
                          <button
                            key={opcion}
                            onClick={() => setPrenda(opcion)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                              prenda === opcion
                                ? "border-accent-gold bg-accent-gold/10 text-accent-gold"
                                : "border-neutral-zinc/30 text-neutral-gray hover:border-accent-gold/50"
                            }`}
                          >
                            {opcion}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Cantidad y talla */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white mb-2 font-bold">
                        Cantidad
                      </label>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                          className="w-10 h-10 rounded-full border border-neutral-zinc/30 text-white hover:border-accent-gold"
                        >
                          -
                        </button>
                        <span className="text-white text-xl font-bold w-8 text-center">
                          {cantidad}
                        </span>
                        <button
                          onClick={() => setCantidad(cantidad + 1)}
                          className="w-10 h-10 rounded-full border border-neutral-zinc/30 text-white hover:border-accent-gold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white mb-2 font-bold">
                        Talla
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {tallas.map((t) => (
                          <button
                            key={t}
                            onClick={() => setTalla(t)}
                            className={`p-2 rounded-lg border transition-all duration-300 ${
                              talla === t
                                ? "border-accent-gold bg-accent-gold/10 text-accent-gold"
                                : "border-neutral-zinc/30 text-neutral-gray hover:border-accent-gold/50"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Paso 2: Colores */}
              {currentStep === 2 && (
                <div ref={step2Ref} className="space-y-8">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <span className="w-8 h-8 bg-accent-gold text-primary-black rounded-full flex items-center justify-center mr-3">
                      2
                    </span>
                    Colores
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Color principal */}
                    <div className="space-y-3">
                      <label className="block text-white font-bold">
                        Color principal *
                      </label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="color"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-16 h-16 rounded-full cursor-pointer"
                        />
                        <input
                          type="text"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="flex-1 p-2 bg-primary-black border border-neutral-zinc/30 rounded-lg text-white"
                          placeholder="#f6c75e"
                        />
                      </div>
                    </div>

                    {/* Color secundario */}
                    <div className="space-y-3">
                      <label className="block text-white font-bold">
                        Color secundario
                      </label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="color"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="w-16 h-16 rounded-full cursor-pointer"
                        />
                        <input
                          type="text"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="flex-1 p-2 bg-primary-black border border-neutral-zinc/30 rounded-lg text-white"
                          placeholder="#004aad"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Paleta sugerida */}
                  <div>
                    <label className="block text-white mb-3 font-bold">
                      Colores sugeridos
                    </label>
                    <div className="flex space-x-3">
                      {[
                        "#f6c75e",
                        "#004aad",
                        "#7e5bef",
                        "#50ff05",
                        "#c30000",
                        "#f97316",
                      ].map((color) => (
                        <button
                          key={color}
                          onClick={() => setPrimaryColor(color)}
                          className="w-10 h-10 rounded-full transition-transform hover:scale-110"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Paso 3: Logos */}
              {currentStep === 3 && (
                <div ref={step3Ref} className="space-y-8">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <span className="w-8 h-8 bg-accent-gold text-primary-black rounded-full flex items-center justify-center mr-3">
                      3
                    </span>
                    Logos y diseños
                  </h2>

                  {/* Logo principal */}
                  <div className="space-y-3">
                    <label className="block text-white font-bold">
                      Logo principal
                    </label>
                    <div className="border-2 border-dashed border-neutral-zinc/30 rounded-xl p-6 text-center hover:border-accent-gold transition-colors">
                      {!logoUrl ? (
                        <>
                          <FaCloudUploadAlt className="text-4xl text-neutral-gray mx-auto mb-3" />
                          <p className="text-neutral-gray mb-2">
                            Arrastra tu logo aquí o
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleUpload(e, setLogoUrl, false)}
                            className="hidden"
                            id="logo-upload"
                          />
                          <label
                            htmlFor="logo-upload"
                            className="inline-block px-4 py-2 bg-accent-gold text-primary-black rounded-full cursor-pointer hover:bg-accent-gold/90 transition-colors"
                          >
                            Seleccionar archivo
                          </label>
                        </>
                      ) : (
                        <div className="relative inline-block">
                          <img
                            src={logoUrl}
                            alt="Logo"
                            className="w-32 h-32 object-contain"
                          />
                          <button
                            onClick={() => setLogoUrl("")}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-accent-red rounded-full flex items-center justify-center text-white"
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Logos secundarios */}
                  <div className="space-y-3">
                    <label className="block text-white font-bold">
                      Logos secundarios (máx 3)
                    </label>
                    <div className="border-2 border-dashed border-neutral-zinc/30 rounded-xl p-6">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                          handleUpload(e, setSecondaryLogos, true)
                        }
                        className="hidden"
                        id="logos-upload"
                      />
                      <label
                        htmlFor="logos-upload"
                        className="flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <FaPlus className="text-accent-gold" />
                        <span className="text-neutral-gray">Agregar logos</span>
                      </label>

                      {secondaryLogos.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-4">
                          {secondaryLogos.map((url, i) => (
                            <div key={i} className="relative">
                              <img
                                src={url}
                                alt={`Logo ${i}`}
                                className="w-16 h-16 object-contain bg-white rounded-lg"
                              />
                              <button
                                onClick={() =>
                                  removeImage(
                                    setSecondaryLogos,
                                    i,
                                    secondaryLogos
                                  )
                                }
                                className="absolute -top-2 -right-2 w-5 h-5 bg-accent-red rounded-full flex items-center justify-center text-white text-xs"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Paso 4: Detalles */}
              {currentStep === 4 && (
                <div ref={step4Ref} className="space-y-8">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <span className="w-8 h-8 bg-accent-gold text-primary-black rounded-full flex items-center justify-center mr-3">
                      4
                    </span>
                    Detalles finales
                  </h2>

                  {/* Opciones extra */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Doble vista */}
                    <button
                      onClick={() => setDobleVista(!dobleVista)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        dobleVista
                          ? "border-accent-gold bg-accent-gold/10 text-accent-gold"
                          : "border-neutral-zinc/30 text-neutral-gray hover:border-accent-gold/50"
                      }`}
                    >
                      <MdDoubleArrow className="text-2xl mx-auto mb-2" />
                      <span className="font-bold">Doble vista</span>
                    </button>

                    {/* Gorro */}
                    <button
                      onClick={() => setGorro(!gorro)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        gorro
                          ? "border-accent-gold bg-accent-gold/10 text-accent-gold"
                          : "border-neutral-zinc/30 text-neutral-gray hover:border-accent-gold/50"
                      }`}
                    >
                      <FaHatCowboy className="text-2xl mx-auto mb-2" />
                      <span className="font-bold">Incluir gorro</span>
                    </button>
                  </div>

                  {/* Tipo de manga */}
                  <div>
                    <label className="block text-white mb-3 font-bold">
                      Tipo de manga
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "Sin manga",
                        "Manga corta",
                        "Manga larga",
                        "Manga raglán",
                      ].map((manga) => (
                        <button
                          key={manga}
                          onClick={() => setTipoManga(manga)}
                          className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                            tipoManga === manga
                              ? "border-accent-gold bg-accent-gold/10 text-accent-gold"
                              : "border-neutral-zinc/30 text-neutral-gray hover:border-accent-gold/50"
                          }`}
                        >
                          <FaCut className="inline mr-2" />
                          {manga}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notas adicionales */}
                  <div>
                    <label className="block text-white mb-2 font-bold">
                      Notas adicionales
                    </label>
                    <textarea
                      className="w-full h-24 p-3 bg-primary-black border border-neutral-zinc/30 rounded-xl text-white placeholder-neutral-gray/50"
                      placeholder="Cuéntanos más detalles sobre tu diseño..."
                      value={notas}
                      onChange={(e) => setNotas(e.target.value)}
                    />
                  </div>

                  {/* Diseños de referencia */}
                  <div>
                    <label className="block text-white mb-2 font-bold">
                      Diseños de referencia
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) =>
                        handleUpload(e, setReferenceDesigns, true)
                      }
                      className="hidden"
                      id="ref-upload"
                    />
                    <label
                      htmlFor="ref-upload"
                      className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-neutral-zinc/30 rounded-xl cursor-pointer hover:border-accent-gold transition-colors"
                    >
                      <FaCloudUploadAlt className="text-accent-gold" />
                      <span className="text-neutral-gray">
                        Subir imágenes de referencia
                      </span>
                    </label>

                    {referenceDesigns.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-4">
                        {referenceDesigns.map((url, i) => (
                          <div key={i} className="relative">
                            <img
                              src={url}
                              alt={`Referencia ${i}`}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <button
                              onClick={() =>
                                removeImage(
                                  setReferenceDesigns,
                                  i,
                                  referenceDesigns
                                )
                              }
                              className="absolute -top-2 -right-2 w-5 h-5 bg-accent-red rounded-full flex items-center justify-center text-white text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navegación entre pasos */}
              <div className="flex justify-between mt-8 pt-8 border-t border-neutral-zinc/20">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    currentStep === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "border border-white/20 text-white hover:border-accent-gold"
                  }`}
                >
                  <FaArrowLeft className="inline mr-2" />
                  Anterior
                </button>

                {currentStep < 4 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-6 py-3 bg-accent-gold text-primary-black rounded-full font-bold hover:bg-accent-gold/90 transition-all duration-300"
                  >
                    Siguiente
                    <FaArrowRight className="inline ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={loading}
                    className="cart-button px-8 py-3 bg-accent-gold text-primary-black rounded-full font-bold hover:bg-accent-gold/90 transition-all duration-300 flex items-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        <span>Subiendo...</span>
                      </>
                    ) : (
                      <>
                        <FaCheckCircle />
                        <span>Agregar al carrito</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {uploadProgress > 0 && (
                <div className="mt-4">
                  <div className="w-full h-2 bg-neutral-zinc/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-gold transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
