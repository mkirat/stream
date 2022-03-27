import { verifyToken } from './token';

interface VerifyTokenProps {
    token: string;
}
export const extractUserIfThere = (req, res, next) => {
  const bearerHeader = req.headers.authorization || '';
  const bearer = bearerHeader.split(' ');
  const account = bearer[1];

  req.user = {
    publicKey: account,
  };
  next();
};
export const tokenMiddleware = (req, res, next) => {
  const bearerHeader = req.headers.authorization || '';
  const bearer = bearerHeader.split(' ');
  const account = bearer[1];

  if (account) {
    req.user = {
      publicKey: account,
    };
    next();
  } else {
    res.status(403).json({ msg: "You're unauthenticated" });
  }
};
