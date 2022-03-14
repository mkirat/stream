"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenMiddleware = exports.extractUserIfThere = void 0;
const token_1 = require("./token");
const extractUserIfThere = (req, res, next) => {
    const bearerHeader = req.headers.authorization || '';
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    try {
        const { publicKey } = (0, token_1.verifyToken)({ token });
        req.user = {
            publicKey,
        };
    }
    catch (e) {
    }
    next();
};
exports.extractUserIfThere = extractUserIfThere;
const tokenMiddleware = (req, res, next) => {
    const bearerHeader = req.headers.authorization || '';
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    try {
        const { publicKey } = (0, token_1.verifyToken)({ token });
        req.user = {
            publicKey,
        };
        next();
    }
    catch (e) {
        console.log('catch');
        res.status(403).json({ msg: "You're unauthenticated" });
    }
};
exports.tokenMiddleware = tokenMiddleware;
//# sourceMappingURL=middlewares.js.map