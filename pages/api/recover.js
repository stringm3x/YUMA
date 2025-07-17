import { shopifyFetch } from '../../lib/shopify';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email } = req.body;

  const mutation = `
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors { message }
      }
    }
  `;

  try {
    const data = await shopifyFetch(mutation, { email });
    const errs = data.customerRecover.customerUserErrors;
    if (errs.length) {
      return res.status(400).json({ error: errs[0].message });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
}
