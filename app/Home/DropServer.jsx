// app/Home/DropServer.jsx
import { getAllProducts } from "../../lib/shopify";
import DropClient from "./DropClient";

export default async function DropServer() {
  // 1. Trae hasta 4 productos
  const products = await getAllProducts(4);
  const count = 4;
  const displayProducts =
    products.length >= count
      ? products.slice(0, count)
      : Array.from({ length: count }, () => products[0]);

  return <DropClient products={displayProducts} />;
}
