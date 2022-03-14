/*
 * The file contains a mechanism to create short lived tokens and refresh them
 * after a user signs in once. This token refreshes until the user refreshes the page
 * and they need to re-sign a message to get a fresh token.
 */
import jwt from 'jsonwebtoken';
import bs58 from 'bs58';
import BN from 'bn.js';

/*
 * Create a fresh token when a user signs a message
 * for the first time
 */
import { sign } from 'tweetnacl';
import { SIGNATURE_MESSAGE, TOKEN_SECRET } from '../config';

export const TOKEN_EXPIRY_INTERVAL = 7 * 60;

export const verifySignature = ({ originalMessage, signedMessage, publicKey }) => {
  const signature = bs58.decode(signedMessage);
  const message = new TextEncoder().encode(originalMessage);
  const decoded = bs58.decode(publicKey);
  const bn = new BN(decoded);
  let toBuffer = bn.toArrayLike(Buffer);
  if (toBuffer.length !== 32) {
    const zeroPad = Buffer.alloc(32);
    toBuffer.copy(zeroPad, 32 - toBuffer.length);
    toBuffer = zeroPad;
  }
  if (!sign.detached.verify(message, signature, toBuffer)) {
    return false;
  }
  return true;
};

export const createToken = ({ message, publicKey }) => {
  if (verifySignature({ originalMessage: SIGNATURE_MESSAGE, signedMessage: message, publicKey })) {
    return jwt.sign({ publicKey }, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRY_INTERVAL });
  }
  throw new Error('Error while creating token');
};

export const verifyToken = ({ token }: {token: string}): {publicKey: string} => {
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    return {
      publicKey: decoded.publicKey,
    };
  } catch (e) {
    throw new Error('Token invalid or expired');
  }
};

export const refreshToken = ({ token }: {token: string}) => {
  const { publicKey } = verifyToken({ token });
  return jwt.sign({ publicKey }, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRY_INTERVAL });
};
