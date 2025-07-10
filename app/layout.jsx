import { Poppins, Passion_One } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "@/app/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins-sans",
  weight: "200",
  subsets: ["latin"],
});

const passionOne = Passion_One({
  variable: "--font-passion-one",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "YUMA Store",
  description: "Tienda deportiva YUMA",
  icons: {
    icon: "/favico.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body
        className={`
          ${poppins.variable} ${passionOne.variable}
          bg-black text-white
        `}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
