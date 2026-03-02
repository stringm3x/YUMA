"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import gsap from "gsap";

const menuItems = [
  { label: "Inicio", href: "/" },
  { label: "Hombres", href: "/Men" },
  { label: "Mujeres", href: "/Women" },
  { label: "Diseña", href: "/Design" },
  { label: "Nosotros", href: "/About" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { lines } = useCart();
  const { user, logout } = useAuth();
  const itemCount = lines.reduce((total, { quantity }) => total + quantity, 0);

  // Refs para animaciones
  const headerRef = useRef(null);
  const menuItemsRef = useRef([]);
  const cartBounceRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const menuContentRef = useRef(null);
  const closeButtonRef = useRef(null);
  const logoRef = useRef(null);
  const userMenuRef = useRef(null);

  // Marcar cuando el componente está montado en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Efecto para animación de scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animación del header al hacer scroll
  useEffect(() => {
    if (!mounted) return;

    gsap.to(headerRef.current, {
      backgroundColor: scrolled ? "rgba(0, 0, 0, 0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(10px)" : "blur(0px)",
      padding: scrolled ? "0.75rem 2rem" : "1.5rem 2rem",
      duration: 0.3,
      ease: "power2.out",
      boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.5)" : "none",
      borderBottom: scrolled ? "1px solid rgba(209, 213, 219, 0.1)" : "none",
    });

    // Animación del logo
    gsap.to(logoRef.current, {
      scale: scrolled ? 0.9 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [scrolled, mounted]);

  // Animación de entrada del logo
  useEffect(() => {
    if (!mounted) return;

    gsap.fromTo(
      logoRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, [mounted]);

  // Función para cerrar el menú
  const closeMenu = () => {
    if (!isOpen) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        document.body.style.overflow = "unset";
      },
    });

    tl.to(menuItemsRef.current, {
      opacity: 0,
      x: -30,
      duration: 0.2,
      stagger: 0.03,
      ease: "power2.in",
    })
      .to(
        [menuContentRef.current, closeButtonRef.current],
        {
          opacity: 0,
          x: -50,
          duration: 0.2,
        },
        "-=0.1"
      )
      .to(
        menuOverlayRef.current,
        {
          opacity: 0,
          x: "-100%",
          duration: 0.4,
          ease: "power3.in",
        },
        "-=0.1"
      );
  };

  // Función para abrir el menú
  const openMenu = () => {
    setIsOpen(true);

    gsap.set(menuOverlayRef.current, {
      x: "-100%",
      opacity: 0,
      visibility: "visible",
    });
    gsap.set(
      [menuContentRef.current, ...menuItemsRef.current, closeButtonRef.current],
      {
        opacity: 0,
        x: -30,
      }
    );

    const tl = gsap.timeline();

    tl.to(menuOverlayRef.current, {
      opacity: 1,
      x: "0%",
      duration: 0.6,
      ease: "power3.inOut",
    })
      .to(
        closeButtonRef.current,
        {
          opacity: 1,
          rotate: 0,
          x: 0,
          duration: 0.4,
          ease: "back.out(1.2)",
        },
        "-=0.3"
      )
      .to(
        menuContentRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
        },
        "-=0.2"
      )
      .to(
        menuItemsRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.2)",
        },
        "-=0.3"
      );

    document.body.style.overflow = "hidden";
  };

  // Manejar tecla Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  // Hover effects para items del menú
  const handleMenuItemHover = (index, isHover) => {
    if (!menuItemsRef.current[index] || !mounted) return;

    gsap.to(menuItemsRef.current[index], {
      x: isHover ? 15 : 0,
      color: isHover ? "#f6c75e" : "#d1d5db",
      scale: isHover ? 1.05 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Navegación protegida para el carrito
  const handleCartClick = (e) => {
    if (!user) {
      e.preventDefault();
      gsap.to(cartBounceRef.current, {
        x: [-8, 8, -8, 8, 0],
        color: "#c30000",
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(cartBounceRef.current, {
            color: "#FFFFFF",
            duration: 0.2,
          });
        },
      });

      setTimeout(() => router.push("/Login"), 500);
    }
  };

  // Animación del carrito cuando se agregan items
  useEffect(() => {
    if (itemCount > 0 && cartBounceRef.current && mounted) {
      gsap.fromTo(
        cartBounceRef.current,
        { scale: 1, color: "#FFFFFF" },
        {
          scale: 1.4,
          color: "#f6c75e",
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        }
      );
    }
  }, [itemCount, mounted]);

  // Cerrar menú de usuario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 text-white flex items-center justify-between px-4 md:px-8 py-4 md:py-6 transition-all"
      >
        {/* Botón hamburguesa */}
        <button
          onClick={openMenu}
          className="text-neutral-gray hover:text-accent-gold transition-all duration-300 group"
          aria-label="Abrir menú"
        >
          <FaBars
            size={24}
            className="group-hover:scale-110 transition-transform duration-300"
          />
        </button>

        {/* Logo */}
        <div
          ref={logoRef}
          className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer group"
          onClick={() => router.push("/")}
        >
          <div className="relative">
            <Image
              src="/YUMA.png"
              alt="YUMA"
              width={65}
              height={65}
              className="hover:scale-110 transition-transform duration-300"
              priority
            />
            {/* Efecto de glow en hover */}
            <div className="absolute inset-0 bg-accent-gold rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          </div>
          {/* Texto de marca solo en desktop */}
        </div>

        {/* Íconos de usuario, favoritos y carrito */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Usuario - SOLO inicio o cerrar sesión */}
          <div className="relative" ref={userMenuRef}>
            {user ? (
              <>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-neutral-gray hover:text-accent-gold transition-colors duration-300 group"
                  aria-label="Menú de usuario"
                >
                  <div className="relative">
                    <FaUser size={20} className="md:w-5 md:h-5" />
                    <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-accent-green rounded-full animate-pulse" />
                  </div>
                  <span className="hidden lg:block text-sm font-medium">
                    {user.email?.split("@")[0]}
                  </span>
                </button>

                {/* Dropdown menú usuario - SOLO inicio y cerrar sesión */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-3 w-40 bg-primary-black border border-neutral-zinc/20 rounded-lg shadow-xl overflow-hidden">
                    <div className="py-2">
                      <Link
                        href="/Profile"
                        className="block px-4 py-2 text-sm text-neutral-gray hover:bg-accent-gold/10 hover:text-accent-gold transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Mi Perfil
                      </Link>
                      <div className="border-t border-neutral-zinc/20 my-1" />
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-accent-red hover:bg-accent-red/10 transition-colors"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link
                href="/Login"
                className="flex items-center space-x-2 text-neutral-gray hover:text-accent-gold transition-colors duration-300 group"
                aria-label="Iniciar sesión"
              >
                <FaUser size={20} className="md:w-5 md:h-5" />
                <span className="hidden lg:block text-sm font-medium">
                  Iniciar Sesión
                </span>
              </Link>
            )}
          </div>

          {/* Carrito */}
          <Link href="/Cart" onClick={handleCartClick}>
            <div ref={cartBounceRef} className="relative group">
              <FaShoppingCart
                size={22}
                className="text-neutral-gray group-hover:text-accent-gold transition-colors duration-300"
              />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-accent-gold text-primary-black font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                  {itemCount}
                </span>
              )}
              {/* Tooltip con total */}
              {itemCount > 0 && (
                <span className="absolute -bottom-8 right-0 text-xs bg-primary-black text-neutral-gray px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-neutral-zinc/20">
                  {itemCount} {itemCount === 1 ? "producto" : "productos"}
                </span>
              )}
            </div>
          </Link>
        </div>
      </header>

      {/* Menú lateral */}
      <div
        ref={menuOverlayRef}
        className={`fixed inset-0 bg-primary-black z-50 overflow-hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          visibility: mounted ? (isOpen ? "visible" : "hidden") : "hidden",
          opacity: mounted && isOpen ? 1 : 0,
          transform: mounted && isOpen ? "translateX(0%)" : "translateX(-100%)",
          transition: mounted
            ? "opacity 0.4s ease, transform 0.4s ease, visibility 0.4s ease"
            : "none",
        }}
      >
        {/* Fondo con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-black via-primary-black to-accent-purple/10" />

        {/* Contenido del menú */}
        <div ref={menuContentRef} className="relative h-full flex flex-col">
          {/* Header del menú con botón cerrar */}
          <div className="flex justify-between items-center p-6 md:p-8">
            <button
              ref={closeButtonRef}
              onClick={closeMenu}
              className="text-neutral-gray hover:text-accent-gold transition-all duration-300 hover:rotate-90 transform z-50 cursor-pointer"
              aria-label="Cerrar menú"
              style={{
                opacity: mounted && isOpen ? 1 : 0,
                transform:
                  mounted && isOpen ? "rotate(0deg)" : "rotate(-90deg)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              <FaTimes size={28} />
            </button>

            {/* Logo pequeño en el menú */}
            <div className="md:hidden">
              <Image src="/YUMA.png" alt="YUMA" width={40} height={40} />
            </div>
          </div>

          {/* Menú principal */}
          <nav className="flex-1 flex flex-col justify-center items-start space-y-4 md:space-y-6 pl-6 md:pl-16 lg:pl-24">
            {menuItems.map(({ label, href }, index) => {
              const active = pathname === href;
              return (
                <div key={href} className="relative group">
                  <Link
                    href={href}
                    ref={(el) => (menuItemsRef.current[index] = el)}
                    onClick={(e) => {
                      e.preventDefault();
                      closeMenu();
                      setTimeout(() => {
                        router.push(href);
                      }, 300);
                    }}
                    onMouseEnter={() => handleMenuItemHover(index, true)}
                    onMouseLeave={() => handleMenuItemHover(index, false)}
                    className={`relative text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight transition-all cursor-pointer ${
                      active ? "text-accent-gold" : "text-neutral-gray"
                    }`}
                    style={{
                      opacity: mounted && isOpen ? 1 : 0,
                      transform:
                        mounted && isOpen
                          ? "translateX(0)"
                          : "translateX(-30px)",
                      transition: `opacity 0.4s ease ${
                        index * 0.05
                      }s, transform 0.4s ease ${index * 0.05}s`,
                    }}
                  >
                    {label}
                  </Link>

                  {/* Línea decorativa para item activo */}
                  {active && (
                    <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-10 md:w-1.5 md:h-12 bg-accent-gold rounded-full" />
                  )}

                  {/* Subtítulo decorativo */}
                  <span className="absolute -bottom-3 left-0 text-xs text-accent-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {label === "Inicio"
                      ? "HOME"
                      : label === "Hombres"
                      ? "MEN"
                      : label === "Mujeres"
                      ? "WOMEN"
                      : label === "Diseña"
                      ? "CUSTOM"
                      : "STORY"}
                  </span>
                </div>
              );
            })}
          </nav>

          {/* Footer del menú */}
          <div className="p-6 md:p-8 border-t border-neutral-zinc/20">
            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-neutral-gray">
                  © 2026 YUMA
                </p>
                <p className="text-xs text-neutral-gray/60">
                  Deportes con estilo
                </p>
              </div>

              {/* Redes sociales */}
              <div className="flex space-x-4 md:space-x-6">
                <span className="text-neutral-gray/40 hover:text-accent-blue transition-colors cursor-pointer text-xs md:text-sm">
                  IG
                </span>
                <span className="text-neutral-gray/40 hover:text-accent-purple transition-colors cursor-pointer text-xs md:text-sm">
                  FB
                </span>
                <span className="text-neutral-gray/40 hover:text-accent-gold transition-colors cursor-pointer text-xs md:text-sm">
                  TW
                </span>
                <span className="text-neutral-gray/40 hover:text-accent-green transition-colors cursor-pointer text-xs md:text-sm">
                  TK
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
