// pages/api/test-shopify.js
import { getAllProducts } from '../../lib/shopify';

export default async function handler(req, res) {
  try {
    const products = await getAllProducts(1);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
