export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método no permitido" });

  const { firstName, lastName, email, password } = req.body;

  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id email }
        userErrors { message }
        customerUserErrors { message }
      }
    }
  `;
  const variables = {
    input: { firstName, lastName, email, password },
  };

  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-07/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  const json = await response.json();
  const data = json.data?.customerCreate;

  const errors = [
    ...(data?.userErrors || []),
    ...(data?.customerUserErrors || []),
  ];
  if (errors.length > 0)
    return res.status(400).json({ error: errors[0].message });

  // ¡Listo! Usuario creado.
  return res.status(200).json({ email: data.customer.email });
}
