const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token  = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const endpoint = `https://${domain}/api/2024-07/graphql.json`;

async function shopifyFetch(query, variables = {}) {
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
    console.error(json.errors);
    throw new Error(
      "Shopify query error: " + json.errors.map((e) => e.message).join("; ")
    );
  }
  return json.data;
}

async function getAllProducts(first = 20) {
  const query = `
    query Products($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            priceRange { minVariantPrice { amount currencyCode } }
            images(first: 1) { edges { node { url altText } } }
          }
        }
      }
    }
  `;
  const data = await shopifyFetch(query, { first });
  return data.products.edges.map((e) => e.node);
}

async function getProductByHandle(handle) {
  const query = `
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        descriptionHtml
        variants(first: 10) {
          edges { node { id title price { amount currencyCode } } }
        }
        images(first: 5) { edges { node { url altText } } }
      }
    }
  `;
  const data = await shopifyFetch(query, { handle });
  return data.productByHandle;
}

module.exports = { getAllProducts, getProductByHandle };
