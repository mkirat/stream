export const { LIVEPEER_KEY } = process.env;
export const { TOKEN_SECRET } = process.env;
export const SIGNATURE_MESSAGE = process.env.TOKEN_SECRET || 'Please sign this message to continue to streamit';
export const LIVEPEER_API_URL = 'https://livepeer.com';
