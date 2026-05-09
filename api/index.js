// Vercel serverless function entry — Angular SSR wrapper
// Importa il bundle server prodotto da `ng build` e delega il rendering
export default async (req, res) => {
  const { reqHandler } = await import('../dist/palestra/server/server.mjs');
  return reqHandler(req, res);
};
