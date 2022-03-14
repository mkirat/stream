import express from 'express';
import { createToken, TOKEN_EXPIRY_INTERVAL } from '../auth/token';

const router = express.Router();

router.get('/token', (req, res) => {
  const { message, publicKey } = req.query;
  if (!message || !publicKey) {
    return res.status(403).json({ msg: 'Invalid inputs, please sign the message' });
  }
  try {
    const token = createToken({ message, publicKey });
    return res.json({
      token,
      expiry: TOKEN_EXPIRY_INTERVAL,
    });
  } catch (e) {
    res.status(403).json({
      msg: 'Incorrect signed message/public key',
    });
  }
});

export default router;
