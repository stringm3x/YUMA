export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método no permitido" });

  const { email, password } = req.body;

  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken { accessToken, expiresAt }
        customerUserErrors { message }
      }
    }
  `;
  const variables = { input: { email, password } };

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
  const data = json.data?.customerAccessTokenCreate;
  const errors = data?.customerUserErrors;

  if (errors && errors.length > 0)
    return res.status(400).json({ error: errors[0].message });

  return res.status(200).json({
    accessToken: data.customerAccessToken.accessToken,
    expiresAt: data.customerAccessToken.expiresAt,
    email,
  });
}
