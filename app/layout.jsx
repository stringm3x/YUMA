import { Geist, Passion_One } from "next/font/google";
import "./globals.css";
import Header from "./Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
          ${geistSans.variable} ${passionOne.variable}
          bg-black text-white
        `}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
