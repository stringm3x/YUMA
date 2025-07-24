const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const endpoint = `https://${domain}/api/2024-07/graphql.json`;

export async function shopifyFetch(query, variables = {}) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    console.error("Shopify errors:", json.errors);
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  return json.data;
}

export async function getAllProducts(first = 20) {
  const query = `
    query Products($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title,
            description,
            handle
             options {
            name
            values
          }
            priceRange { minVariantPrice { amount currencyCode } }
            images(first: 1) { edges { node { url altText } } }
          }
        }
      }
    }
  `;
  const { products } = await shopifyFetch(query, { first });
  return products.edges.map((e) => e.node);
}

export async function getProductByHandle(handle) {
  const query = `
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        descriptionHtml
        images(first: 5)  { edges { node { url altText } } }
        variants(first: 10){ edges { node { id title price { amount currencyCode } } } }
      }
    }
  `;
  const { productByHandle } = await shopifyFetch(query, { handle });

  const variants = productByHandle.variants.edges.map((e) => ({
    id: e.node.id,
    title: e.node.title,
    price: e.node.price.amount,
    currency: e.node.price.currencyCode,
  }));

  const sizes = variants.map((v) => v.title);

  return {
    id: productByHandle.id,
    title: productByHandle.title,
    description: productByHandle.descriptionHtml,
    images: productByHandle.images.edges,
    variants,
    sizes,
  };
}
