import { verifyToken } from './token';

interface VerifyTokenProps {
    token: string;
}
export const extractUserIfThere = (req, res, next) => {
  const bearerHeader = req.headers.authorization || '';
  const bearer = bearerHeader.split(' ');
  const token = bearer[1];

  try {
    const { publicKey } = verifyToken({ token });
    req.user = {
      publicKey,
    };
  } catch (e) {
  }
  next();
};
export const tokenMiddleware = (req, res, next) => {
  const bearerHeader = req.headers.authorization || '';
  const bearer = bearerHeader.split(' ');
  const token = bearer[1];

  try {
    const { publicKey } = verifyToken({ token });
    req.user = {
      publicKey,
    };
    next();
  } catch (e) {
    console.log('catch');
    res.status(403).json({ msg: "You're unauthenticated" });
  }
};
