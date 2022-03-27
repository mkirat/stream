"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenMiddleware = exports.extractUserIfThere = void 0;
const extractUserIfThere = (req, res, next) => {
    const bearerHeader = req.headers.authorization || '';
    const bearer = bearerHeader.split(' ');
    const account = bearer[1];
    req.user = {
        publicKey: account,
    };
    next();
};
exports.extractUserIfThere = extractUserIfThere;
const tokenMiddleware = (req, res, next) => {
    const bearerHeader = req.headers.authorization || '';
    const bearer = bearerHeader.split(' ');
    const account = bearer[1];
    if (account) {
        req.user = {
            publicKey: account,
        };
        next();
    }
    else {
        res.status(403).json({ msg: "You're unauthenticated" });
    }
};
exports.tokenMiddleware = tokenMiddleware;
//# sourceMappingURL=middlewares.js.map